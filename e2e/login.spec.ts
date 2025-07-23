import { test, expect } from '@playwright/test'
import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'
import { getSignupPage } from '../support/pages/components/SignupPage'

import { User, Users } from '../support/fixtures/user'

test('deve logar com sucesso', async ({ page }) => {
  const signupPage = getSignupPage(page)
  const loginPage = getLoginPage(page)
  const dashPage = getDashPage(page)
  const toast = getToast(page)

  const user: User = Users.newUser(Date.now())

  // Cadastra o usuário e aguarda confirmação
  await signupPage.open()
  await signupPage.submit(user)
  await expect(page.locator('li[role="status"]')).toContainText('Conta criada com sucesso!Bem-vindo ao Linkaí. Agora você pode criar seu perfil.')

  // (Opcional) Aguarda um tempo para garantir persistência
  // await page.waitForTimeout(1000)

  // Agora faz o login
  await loginPage.open()
  await loginPage.submit(user)

  await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`)
  await expect(toast.element()).toContainText('Login realizado com sucesso!')
  await expect(toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
})

test('não deve logar com senha incorreta', async ({ page }) => {
  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  const user: User = Users.newUser(Date.now())

  await loginPage.open()
  await loginPage.submit(user)

  await expect(toast.element()).toContainText('Oops!')
  await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar com usuário não cadastrado', async ({ page }) => {
  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  const user: User = Users.newUser(Date.now())

  await loginPage.open()
  await loginPage.submit(user)

  await expect(toast.element()).toContainText('Oops!')
  await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})

test('não deve logar quando não informo nenhum dos campos', async ({ page }) => {
  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  const user: User = Users.emptyAllFields

  await loginPage.open()
  await loginPage.submit(user)

  await expect(toast.element()).toContainText('Campos obrigatórios')
  await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')
})

test('não deve logar quando não informo o usuário', async ({ page }) => {
  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  // User with empty username
  const user: User = { ...Users.newUser(Date.now()), username: '' }

  await loginPage.open()
  await loginPage.submit(user)

  await expect(toast.element()).toContainText('Campos obrigatórios')
  await expect(toast.element()).toContainText('Por favor, preencha todos os campos.')
})

test('não deve logar quando não informo a senha', async ({ page }) => {
  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  const user: User = Users.newUser(Date.now())

  await loginPage.open()
  await loginPage.submit(user)

  await expect(toast.element()).toContainText('Oops!')
  await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.')
})
