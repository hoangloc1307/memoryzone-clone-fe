export interface Product {
  id: string
  thumbnail: string
  url: string
  price: number
  priceDiscount: number
  name: string
  rating: number
  brand: string
  quantity: number
  shortSpecs: string
  description: string
  promotion: string
  specifications: { name: string; value: string | string[] }[]
  images: string[]
  categories: {
    id: string
    name: string
  }[]
}

export type SortType = 'default' | 'name:asc' | 'name:desc' | 'price:asc' | 'price:desc' | 'time:asc' | 'time:desc'

export interface ProductListConfig {
  page?: number | string
  sort_by?: SortType
  price_min?: number | string
  price_max?: number | string
  slug?: string
}
