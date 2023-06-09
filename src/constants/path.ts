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
    images: '/admin/images',
    products: '/admin/products',
    productTypes: '/admin/products/types',
    productAttributes: '/admin/products/attributes',
    productCategories: '/admin/products/categories',
  },
} as const

export const protectedPaths = ['/admin', '/me', '/cart']
export const rejectedPaths = ['/login', '/register']

export default path
