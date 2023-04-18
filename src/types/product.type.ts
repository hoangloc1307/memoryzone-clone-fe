interface ProductAttribute {
  id: number
  attribute: string
}

export interface ProductType {
  id: number
  type: string
}

export interface Product {
  id: number
  name: string
  price: number
  priceDiscount: number
  view: number
  quantity: number
  shortInfo: { value: string }[]
  vendor: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
  isDraft: boolean
  isPublish: boolean
  productTypeId: number
  productType: {
    id: number
    type: string
    productAttributes: ProductAttribute[]
  }
  productAttributes: []
  images: []
  categories: []
}

export interface Product2 {
  id: string
  thumbnail: string
  url: string
  price: number
  priceDiscount: number
  name: string
  rating: number
  brand: string
  quantity: number
  shortSpecs: string[]
  description: string
  promotion: string
  specifications: { name: string; value: string | string[] }[]
  images: string[]
  categories: {
    id: string
    name: string
  }[]
  createdAt: string
  updatedAt: string
}

export type ProductSearchSuggest = Pick<Product2, 'id' | 'thumbnail' | 'name' | 'priceDiscount' | 'shortSpecs'>

export type SortType = 'default' | 'name:asc' | 'name:desc' | 'price:asc' | 'price:desc' | 'time:asc' | 'time:desc'

export interface ProductListConfig {
  q?: string
  page?: number
  limit?: number
  view?: 'list' | 'grid'
  sort_by?: SortType
  price_min?: number
  price_max?: number
  slug?: string
  pathname?: string
  keyword?: string
}
