export const navigationData = ['Thanh toán', 'Trả góp', 'Liên hệ', 'Chăm sóc khách hàng', 'Thư viện', 'Tuyển dụng']

export interface HeaderCategory {
  title: string
  url: string
  icon: string
  children?: HeaderCategory[]
}

export const categoryData = [
  {
    title: 'Chuột - Bàn phím - Tai nghe',
    url: '#',
    icon: '',
    children: [
      {
        title: 'Thương hiệu chuột',
        url: '#',
        icon: '',
        children: [
          {
            title: 'Corsair',
            url: '#',
            icon: '',
          },
          {
            title: 'Logitech',
            url: '#',
            icon: '',
          },
        ],
      },
      {
        title: 'Mức giá chuột',
        url: '#',
        icon: '',
        children: [
          {
            title: 'Dưới 500 ngàn',
            url: '#',
            icon: '',
          },
          {
            title: '500 ngàn - 1 triệu',
            url: '#',
            icon: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Laptop',
    url: '#',
    icon: '',
    children: [
      {
        title: 'Thương hiệu laptop',
        url: '#',
        icon: '',
        children: [
          {
            title: 'MSI',
            url: '#',
            icon: '',
          },
          {
            title: 'Asus',
            url: '#',
            icon: '',
          },
        ],
      },
      {
        title: 'Mức giá laptop',
        url: '#',
        icon: '',
        children: [
          {
            title: '5 - 10 triệu',
            url: '#',
            icon: '',
          },
          {
            title: '10 - 15 triệu',
            url: '#',
            icon: '',
          },
        ],
      },
    ],
  },
]
