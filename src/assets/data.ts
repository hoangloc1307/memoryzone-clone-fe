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
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_1.png',
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
          {
            title: 'Razer',
            url: '#',
            icon: '',
          },
          {
            title: 'HyperX',
            url: '#',
            icon: '',
          },
          {
            title: 'SteelSeries',
            url: '#',
            icon: '',
          },
          {
            title: 'MSI',
            url: '#',
            icon: '',
          },
          {
            title: 'Zowie',
            url: '#',
            icon: '',
          },
          {
            title: 'Dell',
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
          {
            title: '1 triệu - 2 triệu',
            url: '#',
            icon: '',
          },
          {
            title: '2 triệu - 3 triệu',
            url: '#',
            icon: '',
          },
          {
            title: 'Trên 3 triệu',
            url: '#',
            icon: '',
          },
        ],
      },
      {
        title: 'Nhu cầu chuột',
        url: '#',
        icon: '',
        children: [
          {
            title: 'Văn phòng',
            url: '#',
            icon: '',
          },
          {
            title: 'Gaming',
            url: '#',
            icon: '',
          },
          {
            title: 'Công thái học',
            url: '#',
            icon: '',
          },
          {
            title: 'Không dây - Wireless',
            url: '#',
            icon: '',
          },
          {
            title: 'Bluetooth',
            url: '#',
            icon: '',
          },
        ],
      },
      {
        title: 'Phụ kiện chuột',
        url: '#',
        icon: '',
      },
      {
        title: 'Thương hiệu bàn phím',
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
          {
            title: 'Keychron',
            url: '#',
            icon: '',
          },
          {
            title: 'Akko - MonsGeek',
            url: '#',
            icon: '',
          },
          {
            title: 'HyperX',
            url: '#',
            icon: '',
          },
          {
            title: 'FL Esports',
            url: '#',
            icon: '',
          },
          {
            title: 'HyperWork',
            url: '#',
            icon: '',
          },
          {
            title: 'Razer',
            url: '#',
            icon: '',
          },
          {
            title: 'DareU',
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
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_2.png',
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
  {
    title: 'PC / Máy bộ',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_3.png',
  },
  {
    title: 'Lifestyle - Livestream setup',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_4.png',
  },
  {
    title: 'Linh kiện PC / Laptop',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_5.png',
  },
  {
    title: 'SSD',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_6.png',
  },
  {
    title: 'RAM',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_7.png',
  },
  {
    title: 'Ổ cứng',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_8.png',
  },
  {
    title: 'Điện thoại',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_13.png',
  },
  {
    title: 'Giải pháp NAS',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_14.png',
  },
  {
    title: 'Dịch vụ thu phí',
    url: '#',
    icon: 'https://bizweb.dktcdn.net/100/329/122/themes/835213/assets/i_menu_15.png',
  },
]

export const footerCategoryData = [
  {
    title: 'Giới thiệu',
    children: [
      {
        tiltle: 'Trang chủ',
        url: '#',
      },
      {
        tiltle: 'Về memoryzone',
        url: '#',
      },
      {
        tiltle: 'Điều khoản giao dịch',
        url: '#',
      },
      {
        tiltle: 'Bảo mật thông tin',
        url: '#',
      },
      {
        tiltle: 'Tuyển dụng',
        url: '#',
      },
    ],
  },
  {
    title: 'Chính sách công ty',
    children: [
      {
        tiltle: 'Chính sách giao nhận',
        url: '#',
      },
      {
        tiltle: 'Chính sách đổi trả hàng',
        url: '#',
      },
      {
        tiltle: 'Phương thức thanh toán',
        url: '#',
      },
      {
        tiltle: 'Hướng dẫn trả góp',
        url: '#',
      },
      {
        tiltle: 'Hướng dẫn kiểm tra hành trình đơn hàng',
        url: '#',
      },
    ],
  },
  {
    title: 'Hỗ trợ khách hàng',
    children: [
      {
        tiltle: 'Hỗ trọ bảo hành',
        url: '#',
      },
      {
        tiltle: 'Cổng thông tin hỗ trợ khách hàng',
        url: '#',
      },
      {
        tiltle: 'Gửi yêu cầu hỗ trợ kỹ thuật',
        url: '#',
      },
      {
        tiltle: 'Tra cứu thông tin hóa đơn',
        url: '#',
      },
      {
        tiltle: 'Phản ánh chất lượng dịch vụ',
        url: '#',
      },
      {
        tiltle: 'Hợp tác kinh doanh',
        url: '#',
      },
    ],
  },
]
