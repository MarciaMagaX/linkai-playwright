import {test, expect} from '@playwright/test'
// import { writeFileSync } from 'fs'; como garimpar o toast

import {getLoginPage} from '../support/pages/LoginPage'

test('deve logar com sucesso', async ({ page }) => {


    const loginPage = getLoginPage(page)


    const user = {
        name: 'Marcia',
        username: 'marciamagax',
        password: '123456'
    }
  await loginPage.open();
  await loginPage.submit(user.username, user.password)
 
  
  await expect(page.locator('h1')).toContainText(`Olá, ${user.name}! 👋`);
});

test('não deve logar com senha incorreta', async ({ page }) => {

    const loginPage = getLoginPage(page)

       const user = {
        name: 'Marcia',
        username: 'marciamagax',
        password: '123321'
    }
  await loginPage.open();
  await loginPage.submit(user.username, user.password)
  

    // await page.waitForTimeout(1000)as 3 próximas linhas são para encontrar o toast

    // const html = await page.content()
    // writeFileSync('temp.html', html)

    const toast = page.locator('.toast')

    await expect(toast).toContainText('Oops!')
    await expect(toast).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
});

test('deve logar com usuário não cadastrado', async ({ page }) => {


    const loginPage = getLoginPage(page)


    const user = {
        name: 'Marcia',
        username: 'not-found',
        password: '123456'
    }
  await loginPage.open();
  await loginPage.submit(user.username, user.password)
  

    const toast = page.locator('.toast')

    await expect(toast).toContainText('Oops!')
    await expect(toast).toContainText('Algo deu errado com seu login. Por favor, verifique suas credenciais e tente novamente.');
  
 
});



