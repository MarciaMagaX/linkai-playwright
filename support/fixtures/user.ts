export interface User {
  name: string
  username: string
  email: string
  password: string
  confirmPassword?: string
}

function makeUser({ name, username, email, password, confirmPassword }: Partial<User> & { password: string }): User {
  return {
    name: name ?? '',
    username: username ?? '',
    email: email ?? '',
    password,
    confirmPassword: confirmPassword ?? password,
  }
}

export const Users = {
  alreadyExists: makeUser({
    name: 'Marcia',
    username: 'marciamagax',
    email: 'marcia@gmail.com',
    password: '123456',
  }),
  newUser: (timestamp: number): User => makeUser({
    name: `Marina${timestamp}`,
    username: `marinamorena${timestamp}`,
    email: `marina${timestamp}@email.com`,
    password: 'Senha123',
  }),
  emptyAllFields: makeUser({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }),
  invalidEmail: (timestamp: number): User => makeUser({
    name: `Teste${timestamp}`,
    username: `testeemailinvalido${timestamp}`,
    email: 'emailsemarroba',
    password: 'Senha123',
  }),
  mismatchedPasswords: (timestamp: number): User => makeUser({
    name: `Teste${timestamp}`,
    username: `teste${timestamp}`,
    email: `teste${timestamp}@mail.com`,
    password: 'Senha123',
    confirmPassword: 'Senha456',
  }),
  weakPassword: (timestamp: number): User => makeUser({
    name: `Teste${timestamp}`,
    username: `teste${timestamp}`,
    email: `teste${timestamp}@mail.com`,
    password: '123',
  }),
  invalidUsername: (timestamp: number): User => makeUser({
    name: `Teste${timestamp}`,
    username: 'nome com espaço',
    email: `teste${timestamp}@mail.com`,
    password: 'Senha123',
  }),
}

