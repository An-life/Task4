export interface IRegistrationResponse {
  accessToken: string
  refreshToken: string
  user: IUserRegistrationData
}

export interface IUserRegistrationData {
  id: string
  status: 'active' | 'block'
}

export interface IRegistrationData {
  name?: string
  email: string
  password: string
}

export interface IUserResponse {
  _id: string
  name: string
  email: string
  status: 'active' | 'block'
  registrationDate: string
  loginDate: string
}

export interface IUsersDataForTable {
  id: string
  name: string
  email: string
  status: 'active' | 'block'
  registrationDate: string
  loginDate: string
}

export interface IChangeStatus {
  users: string[]
  status: 'active' | 'block'
}

export interface IIsAuth {
  isAuth: boolean
}
