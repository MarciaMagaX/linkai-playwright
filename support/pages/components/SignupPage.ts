import { Page } from '@playwright/test'
import { User } from '../../fixtures/user'

export function getSignupPage(page: Page) {
  return {
    open: async () => {
      await page.goto('http://localhost:3000/cadastro')
    },
    submit: async (user: User) => {
      await page.getByRole('textbox', { name: 'Como você gostaria de ser' }).fill(user.name)
      await page.getByRole('textbox', { name: 'Escolha um @username único (' }).fill(user.username)
      await page.getByRole('textbox', { name: 'Seu melhor e-mail para' }).fill(user.email)
      await page.getByRole('textbox', { name: 'Crie uma senha secreta e' }).fill(user.password)
      await page.getByRole('textbox', { name: 'Repita sua senha para' }).fill(user.confirmPassword ?? user.password)
      await page.getByRole('button', { name: 'Criar conta' }).click()
    }
  }
}
