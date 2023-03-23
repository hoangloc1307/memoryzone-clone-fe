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
  description: string
  images: string[]
  categories: {
    id: string
    name: string
  }[]
}
