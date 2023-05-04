import map from 'lodash/map'
import sampleSize from 'lodash/sampleSize'
import { Product2 } from '~/types/product.type'
import { productsData } from './productData'

export const productAndCategoryData = () => [
  {
    category: 'Laptop',
    url: '#',
    children: [
      { category: 'Văn phòng', url: '#' },
      { category: 'Gaming', url: '#' },
      { category: 'Intel EVO', url: '#' },
      { category: 'NVIDIA Studio', url: '#' },
      { category: 'AMD Advantage', url: '#' },
      { category: 'Xem tất cả', url: '#' },
    ],
    products: sampleSize(
      productsData.filter((product) => map(product.categories, 'name').includes('Laptop')),
      12
    ) as Product2[],
    banners: [
      {
        image: 'banner_1_fashion.png',
        url: '#',
        alt: 'Hỗ trợ trả góp 6 tháng',
      },
      {
        image: 'banner_2_fashion.png',
        url: '#',
        alt: 'Hỗ trợ trả góp 12 tháng',
      },
    ],
  },
  {
    category: 'Working / Gaming gear',
    url: '#',
    children: [
      { category: 'Chuột gaming / văn phòng', url: '#' },
      { category: 'Bàn phím gaming / văn phòng', url: '#' },
      { category: 'Tai nghe gaming / văn phòng', url: '#' },
      { category: 'Webcam', url: '#' },
      { category: 'Thiết bị Stream', url: '#' },
      { category: 'Xem tất cả', url: '#' },
    ],
    products: sampleSize(
      productsData.filter((product) => map(product.categories, 'name').includes('Gear')),
      12
    ) as Product2[],
    banners: [
      {
        image: 'banner_1_electronic3.png',
        url: '#',
        alt: 'Logitech deal hời lời to',
      },
      {
        image: 'banner_2_electronic3.png',
        url: '#',
        alt: 'Razer festival',
      },
    ],
  },
]
