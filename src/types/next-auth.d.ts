import { User } from './user.type'

declare module 'next-auth' {
  interface Session {
    user: User
  }
  interface User {
    role: 'USER' | 'ADMIN'
    accessToken: string
    refreshToken: string
  }
}
