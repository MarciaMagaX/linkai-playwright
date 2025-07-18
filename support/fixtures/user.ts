export interface User {
  name: string
  username: string
  password: string
}

export const Users = {
  validUser: {
    name: 'Marcia',
    username: 'marciamagax',
    password: '123456',
  },
  invalidPassword: {
    name: 'Marcia',
    username: 'marciamagax',
    password: '123321',
  },
  notRegistered: {
    name: 'Marcia',
    username: 'not-found',
    password: '123456',
  },
  emptyAllFields: {
    name: 'Marcia',
    username: '',
    password: '',
  },
  emptyUsername: {
    name: 'Marcia',
    username: '',
    password: '123456',
  },
  emptyPassword: {
    name: 'Marcia',
    username: 'marciamagax',
    password: '',
  },
}

