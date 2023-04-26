const path = {
  home: '/',
  login: '/login',
  register: '/register',
  logout: '/logout',
  cart: '/cart',
  search: '/search',
  me: '/me',
  admin: {
    dashboard: '/admin',
    products: '/admin/products',
    productAttributes: '/admin/products/attributes',
    productCategories: '/admin/products/categories',
  },
} as const

export const protectedPaths = ['/admin', '/me', '/cart']
export const rejectedPaths = ['/login', '/register']

export default path
