export interface Album {
  id: string
  title: string
  datetime: string
  cover: string
  privacy: string
  link: string
  images_count: number
  deletehash: string
  order: number
}

export interface Image {
  id: string
  title: string | null
  description: string | null
  datetime: number
  type: string
  size: number
  bandwidth: number
  deletehash: string
  name: string
  link: string
}
