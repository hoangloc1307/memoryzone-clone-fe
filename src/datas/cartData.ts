export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

export const cartData: CartItem[] = [
  {
    id: '1ab48921-6cfd-4a5c-8a1a-76a38603efc4',
    name: 'Bàn phím cơ không dây Keychron K12 Aluminum Led RGB HotSwap Gateron G Pro Switch Red / Blue / Brown',
    image: 'ban-phim-co-khong-day-keychron-k12-aluminum-led-rgb-hotswap-gateron-g-pro-switch.jpg',
    quantity: 2,
    price: 1790000,
  },
  {
    id: 'ca52a039-5987-433d-ba2a-b2078208cfb6',
    name: 'PC ST-VENUS i5 TUF (i5-12400F, RTX 3060 Ti OC 8G, Ram 16GB, SSD 250GB, 750W)',
    image: 'pc-st-venus-i5-tuf-03.jpg',
    quantity: 1,
    price: 23990000,
  },
  {
    id: 'b2881fb0-b879-469c-99b8-6ba65ab191e8',
    name: 'Laptop Asus Zenbook 14 OLED UX3402VA-KM203W (i5-1340P EVO, Iris Xe Graphics, Ram 16GB DDR5, SSD 512GB, 14 Inch OLED 2.8K)',
    image: 'laptop-asus-zenbook-14-oled-ux3402va-km203w.jpg',
    quantity: 1,
    price: 25990000,
  },
]
