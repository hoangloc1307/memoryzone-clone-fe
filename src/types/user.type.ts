export interface User {
  id?: string
  email?: string
  role?: 'ADMIN' | 'USER'
  accessToken?: string
  refreshToken?: string
}
