const path = {
  home: '/',
  login: '/login',
  register: '/register',
  cart: '/cart',
  search: '/search',
  me: '/me',
  admin: {
    dashboard: '/admin',
    products: '/admin/products',
  },
} as const

export const protectedPaths = ['/admin', '/me', '/cart']
export const rejectedPaths = ['/login', '/register']

export default path
