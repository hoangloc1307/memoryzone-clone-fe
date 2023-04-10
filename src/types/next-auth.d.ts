import { User } from './user.type'

declare module 'next-auth' {
  interface Session {
    user: User
  }
  interface User {
    accessToken: string
    refreshToken: string
  }
}
