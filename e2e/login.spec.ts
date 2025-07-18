import { test, expect } from '@playwright/test'
// import { writeFileSync } from 'fs'; como garimpar o toast

import { getLoginPage } from '../support/pages/LoginPage'
import { getDashPage } from '../support/pages/DashPage'
import { getToast } from '../support/pages/components/Toast'

import { User } from '../support/fixtures/user'

test('deve logar com sucesso', async ({ page }) => {


  const loginPage = getLoginPage(page)
  const dashPage = getDashPage(page)
  const toast = getToast(page)


  const user = {
    name: 'Marcia',
    username: 'marciamagax',
    password: '123456'
  }
  await loginPage.open();
  await loginPage.submit(user)


  await expect(dashPage.welcome()).toContainText(`Olá, ${user.name}! 👋`);
  await expect(toast.element()).toContainText('Login realizado com sucesso!')
  await expect(toast.element()).toContainText('Bem-vindo de volta ao Linkaí.')
});

test('não deve logar com senha incorreta', async ({ page }) => {

  const loginPage = getLoginPage(page)
  const toast = getToast(page)

  const user = {
    name: 'Marcia',
    username: 'marciamagax',
    password: '123321'
  }
  await loginPage.open();
  await loginPage.submit(user)


  // await page.waitForTimeout(1000)as 3 próximas linhas são para encontrar o toast

  // const html = await page.content()
  // writeFileSync('temp.html', html)

  await expect(toast.element()).toContainText('Oops!')
  await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
});

test('não deve logar com usuário não cadastrado', async ({ page }) => {


  const loginPage = getLoginPage(page)
  const toast = getToast(page)


  const user = {
    name: 'Marcia',
    username: 'not-found',
    password: '123456'
  }
  await loginPage.open();
  await loginPage.submit(user)


  await expect(toast.element()).toContainText('Oops!')
  await expect(toast.element()).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');


});

test('não deve logar quando não informo nenhum dos campos', async ({ page }) => {


  const loginPage = getLoginPage(page)
  const toast = getToast(page)


  const user = {
    name: 'Marcia',
    username: '',
    password: ''
  }
  await loginPage.open();
  await loginPage.submit(user)


  await expect(toast.element()).toContainText('Campos obrigatórios')
  await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');


});

test('não deve logar quando não informo o usuário', async ({ page }) => {


  const loginPage = getLoginPage(page)
  const toast = getToast(page)


  const user = {
    name: 'Marcia',
    username: '',
    password: '123456'
  }
  await loginPage.open();
  await loginPage.submit(user)


  await expect(toast.element()).toContainText('Campos obrigatórios')
  await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');


});

test('não deve logar quando não informo a senha', async ({ page }) => {


  const loginPage = getLoginPage(page)
  const toast = getToast(page)


  const user = {
    name: 'Marcia',
    username: 'marciamagax',
    password: ''
  }
  await loginPage.open();
  await loginPage.submit(user)


  await expect(toast.element()).toContainText('Campos obrigatórios')
  await expect(toast.element()).toContainText('Por favor, preencha todos os campos.');


});





