export interface User {
  id: string
  name: string
  email: string
  dayOfBirth: string
  phone: string
  address: string
  avatar: string
  type: 'CUSTOMER' | 'EMPLOYEE'
}
