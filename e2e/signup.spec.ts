import { test, expect } from '@playwright/test'

test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {
  const timestamp = Date.now()

  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(`Marina${timestamp}`)
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(`marinamorena${timestamp}`)
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(`marina${timestamp}@email.com`)
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('Senha123')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('Senha123')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  await expect(
    page.locator('li[role="status"]')
  ).toContainText('Conta criada com sucesso!Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('não deve permitir cadastro com email ou username já existente', async ({ page }) => {
  // Dados já cadastrados no teste anterior (sem timestamp)
  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill('Marcia')
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill('marciamagax')
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill('marcia@gmail.com')
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('123456')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('123456')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  // Valida a presença do toast de erro
  const toast = page.locator('.toast-title', { hasText: 'Erro no cadastro' })
  await expect(toast).toBeVisible()

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('User with that email or username already exists')
})

test('não deve permitir cadastro com campos vazios', async ({ page }) => {
  await page.goto('http://localhost:3000/cadastro');

  await page.getByRole('button', { name: 'Criar conta' }).click();

  // Verifica a mensagem de erro
 await expect(page.locator('span[role="status"]')).toContainText('Campos obrigatóriosPor favor, preencha todos os campos.')

});

test('deve validar quando campo email for inválido', async ({ page }) => {
  const timestamp = Date.now()

  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(`Teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(`testeemailinvalido${timestamp}`)
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill('emailsemarroba') // inválido
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('Senha123')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('Senha123')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  // Captura a mensagem nativa de validação do navegador para campo email
  const emailInput = await page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
  const validationMessage = await emailInput.evaluate((input: HTMLInputElement) => input.validationMessage)

  expect(validationMessage).toBe(`Please include an '@' in the email address. 'emailsemarroba' is missing an '@'.`)
})


test('não deve permitir cadastro com senhas diferentes', async ({ page }) => {
  const timestamp = Date.now()

  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(`Teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(`teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(`teste${timestamp}@mail.com`)
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('Senha123')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('Senha456')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('A confirmação de senha deve ser igual à senha.')
})

test('não deve permitir cadastro com senha fraca', async ({ page }) => {
  const timestamp = Date.now()

  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(`Teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(`teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(`teste${timestamp}@mail.com`)
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('123')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('123')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('A senha deve ter pelo menos 6 caracteres.')
})

test('não deve permitir cadastro com username inválido', async ({ page }) => {
  const timestamp = Date.now()

  await page.goto('http://localhost:3000/cadastro')

  await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(`Teste${timestamp}`)
  await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill('nome com espaço')
  await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(`teste${timestamp}@mail.com`)
  await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill('Senha123')
  await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill('Senha123')

  await page.getByRole('button', { name: 'Criar conta' }).click()

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('O username deve conter apenas letras, números e underscores.')
})


