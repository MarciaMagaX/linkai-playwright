import { test, expect } from '@playwright/test'
import { getSignupPage } from '../support/pages/components/SignupPage'
import { Users } from '../support/fixtures/user'

// Helper para timestamp dinâmico
const timestamp = Date.now()

test('deve cadastrar um novo usuário com sucesso', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.newUser(timestamp))

  await expect(
    page.locator('li[role="status"]')
  ).toContainText('Conta criada com sucesso!Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')
})

test('não deve permitir cadastro com email ou username já existente', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.alreadyExists)

  const toast = page.locator('.toast-title', { hasText: 'Erro no cadastro' })
  await expect(toast).toBeVisible()

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('User with that email or username already exists')
})

test('não deve permitir cadastro com campos vazios', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.emptyAllFields)

  await expect(page.locator('span[role="status"]')).toContainText('Campos obrigatóriosPor favor, preencha todos os campos.')
})

test('deve validar quando campo email for inválido', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.invalidEmail(timestamp))

  const emailInput = await page.getByRole('textbox', { name: 'Seu melhor e-mail para' })
  const validationMessage = await emailInput.evaluate((input) => (input as HTMLInputElement).validationMessage)

  expect(validationMessage).toBe(`Please include an '@' in the email address. 'emailsemarroba' is missing an '@'.`)
})

test('não deve permitir cadastro com senhas diferentes', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.mismatchedPasswords(timestamp))

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('A confirmação de senha deve ser igual à senha.')
})

test('não deve permitir cadastro com senha fraca', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.weakPassword(timestamp))

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('A senha deve ter pelo menos 6 caracteres.')
})

test('não deve permitir cadastro com username inválido', async ({ page }) => {
  const signupPage = getSignupPage(page)
  await signupPage.open()
  await signupPage.submit(Users.invalidUsername(timestamp))

  const toastDesc = page.locator('.toast-desc')
  await expect(toastDesc).toContainText('O username deve conter apenas letras, números e underscores.')
})


