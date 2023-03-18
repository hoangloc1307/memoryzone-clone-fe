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
    icon: 'i_menu_1.png',
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
    icon: 'i_menu_2.png',
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
    icon: 'i_menu_3.png',
  },
  {
    title: 'Lifestyle - Livestream setup',
    url: '#',
    icon: 'i_menu_4.png',
  },
  {
    title: 'Linh kiện PC / Laptop',
    url: '#',
    icon: 'i_menu_5.png',
  },
  {
    title: 'SSD',
    url: '#',
    icon: 'i_menu_6.png',
  },
  {
    title: 'RAM',
    url: '#',
    icon: 'i_menu_7.png',
  },
  {
    title: 'Ổ cứng',
    url: '#',
    icon: 'i_menu_8.png',
  },
  {
    title: 'Điện thoại',
    url: '#',
    icon: 'i_menu_13.png',
  },
  {
    title: 'Giải pháp NAS',
    url: '#',
    icon: 'i_menu_14.png',
  },
  {
    title: 'Dịch vụ thu phí',
    url: '#',
    icon: 'i_menu_15.png',
  },
]

export const footerNavigationData = [
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
        tiltle: 'Hỗ trợ bảo hành',
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

export const footerCategoryData = [
  {
    title: 'Thương hiệu Laptop',
    children: [
      {
        title: 'Macbook',
        url: '#',
      },
      {
        title: 'MSI',
        url: '#',
      },
      {
        title: 'Gigabyte',
        url: '#',
      },
      {
        title: 'HP',
        url: '#',
      },
      {
        title: 'Acer',
        url: '#',
      },
      {
        title: 'Asus',
        url: '#',
      },
      {
        title: 'Dell',
        url: '#',
      },
      {
        title: 'Lenovo',
        url: '#',
      },
      {
        title: 'Intel',
        url: '#',
      },
      {
        title: 'Huawei',
        url: '#',
      },
    ],
  },
  {
    title: 'Trending',
    children: [
      {
        title: 'Laptop chuẩn Intel Evo',
        url: '#',
      },
      {
        title: 'Laptop Intel Gen 12',
        url: '#',
      },
      {
        title: 'Laptop Ryzen 6000',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop Acer',
    children: [
      {
        title: 'Swift',
        url: '#',
      },
      {
        title: 'ConceptD',
        url: '#',
      },
      {
        title: 'Aspire',
        url: '#',
      },
      {
        title: 'Nitro',
        url: '#',
      },
      {
        title: 'Predator',
        url: '#',
      },
      {
        title: 'Triton',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop Dell',
    children: [
      {
        title: 'Latitude',
        url: '#',
      },
      {
        title: 'Inspiron',
        url: '#',
      },
      {
        title: 'Vostro',
        url: '#',
      },
      {
        title: 'G Series',
        url: '#',
      },
      {
        title: 'Alienware',
        url: '#',
      },
      {
        title: 'XPS',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop Gigabyte',
    children: [
      {
        title: 'U SERIES',
        url: '#',
      },
      {
        title: 'G5',
        url: '#',
      },
      {
        title: 'G7',
        url: '#',
      },
      {
        title: 'AERO',
        url: '#',
      },
      {
        title: 'AORUS',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop Asus',
    children: [
      {
        title: 'TUF',
        url: '#',
      },
      {
        title: 'Zenbook',
        url: '#',
      },
      {
        title: 'Zenbook Duo',
        url: '#',
      },
      {
        title: 'Zenbook Flip',
        url: '#',
      },
      {
        title: 'Zenbook Pro',
        url: '#',
      },
      {
        title: 'ROG Zephyrus G14',
        url: '#',
      },
      {
        title: 'ROG Zephyrus G15',
        url: '#',
      },
      {
        title: 'ROG Zephyrus Duo',
        url: '#',
      },
      {
        title: 'ROG Zephyrus M16',
        url: '#',
      },
      {
        title: 'ROG Flow',
        url: '#',
      },
      {
        title: 'ROG Strix',
        url: '#',
      },
      {
        title: 'Vivobook',
        url: '#',
      },
      {
        title: 'ExpertBook',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop HP',
    children: [
      {
        title: 'Envy',
        url: '#',
      },
      {
        title: 'Pavilion',
        url: '#',
      },
      {
        title: 'Victus',
        url: '#',
      },
      {
        title: 'Elite',
        url: '#',
      },
      {
        title: 'Spectre',
        url: '#',
      },
      {
        title: 'ZBook',
        url: '#',
      },
      {
        title: 'Probook',
        url: '#',
      },
      {
        title: 'Omen',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop MSI',
    children: [
      {
        title: 'Alpha Series',
        url: '#',
      },
      {
        title: 'Delta Series',
        url: '#',
      },
      {
        title: 'Bravo Series',
        url: '#',
      },
      {
        title: 'GF Series',
        url: '#',
      },
      {
        title: 'GL Series',
        url: '#',
      },
      {
        title: 'GP Series',
        url: '#',
      },
      {
        title: 'GE Series',
        url: '#',
      },
      {
        title: 'GS Series',
        url: '#',
      },
      {
        title: 'Modern & Prestige',
        url: '#',
      },
      {
        title: 'Summit',
        url: '#',
      },
      {
        title: 'Creator',
        url: '#',
      },
    ],
  },
  {
    title: 'Laptop Lenovo',
    children: [
      {
        title: 'Ideapad',
        url: '#',
      },
      {
        title: 'Thinkbook',
        url: '#',
      },
      {
        title: 'Thinkpad',
        url: '#',
      },
      {
        title: 'Yoga',
        url: '#',
      },
      {
        title: 'Ideapad Gaming',
        url: '#',
      },
      {
        title: 'Legion',
        url: '#',
      },
    ],
  },
  {
    title: 'PC Đồng Bộ',
    children: [
      {
        title: 'HP',
        url: '#',
      },
      {
        title: 'Dell',
        url: '#',
      },
      {
        title: 'Lenovo',
        url: '#',
      },
    ],
  },
  {
    title: 'Mini PC',
    children: [
      {
        title: 'Intek NUC',
        url: '#',
      },
      {
        title: 'Asus',
        url: '#',
      },
      {
        title: 'HP',
        url: '#',
      },
      {
        title: 'MSI',
        url: '#',
      },
      {
        title: 'Asrock',
        url: '#',
      },
      {
        title: 'Mac Mini',
        url: '#',
      },
    ],
  },
  {
    title: 'Chuột Gaming',
    children: [
      {
        title: 'Chuột Corsair',
        url: '#',
      },
      {
        title: 'Chuột Logitech',
        url: '#',
      },
      {
        title: 'Chuột Dell',
        url: '#',
      },
      {
        title: 'Chuột MSI',
        url: '#',
      },
      {
        title: 'Chuột Razer',
        url: '#',
      },
      {
        title: 'Chuột SteelSeries',
        url: '#',
      },
      {
        title: 'Chuột HyperX',
        url: '#',
      },
      {
        title: 'Chuột Zowie',
        url: '#',
      },
      {
        title: 'Chuột Rapoo',
        url: '#',
      },
      {
        title: 'Phụ Kiện Chuột',
        url: '#',
      },
    ],
  },
  {
    title: 'Bàn Phím Gaming',
    children: [
      {
        title: 'Bàn Phím Corsair',
        url: '#',
      },
      {
        title: 'Bàn Phím Logitech',
        url: '#',
      },
      {
        title: 'Bàn Phím Keychron',
        url: '#',
      },
      {
        title: 'Bàn Phím Akko',
        url: '#',
      },
      {
        title: 'Bàn Phím Dell',
        url: '#',
      },
      {
        title: 'Bàn Phím HyperX',
        url: '#',
      },
      {
        title: 'Bàn Phím Razer',
        url: '#',
      },
      {
        title: 'Bàn Phím Rapoo',
        url: '#',
      },
      {
        title: 'Keycaps',
        url: '#',
      },
      {
        title: 'Phụ Kiện Bàn phím',
        url: '#',
      },
    ],
  },
  {
    title: 'Tai Nghe Gaming',
    children: [
      {
        title: 'Tai nghe Corsair',
        url: '#',
      },
      {
        title: 'Tai nghe Logitech',
        url: '#',
      },
      {
        title: 'Tai nghe Asus',
        url: '#',
      },
      {
        title: 'Tai nghe Razer',
        url: '#',
      },
      {
        title: 'Tai nghe SteelSeries',
        url: '#',
      },
      {
        title: 'Tai nghe HyperX',
        url: '#',
      },
      {
        title: 'Tai nghe HP',
        url: '#',
      },
      {
        title: 'Tai nghe Samsung',
        url: '#',
      },
      {
        title: 'Phụ kiện tai nghe',
        url: '#',
      },
    ],
  },
  {
    title: 'Ghế Gaming',
    children: [
      {
        title: 'Ghế Corsair',
        url: '#',
      },
      {
        title: 'Ghế Warrior',
        url: '#',
      },
      {
        title: 'Ghế Sihoo',
        url: '#',
      },
      {
        title: 'Ghế AKRacing',
        url: '#',
      },
      {
        title: 'Ghế Epione',
        url: '#',
      },
      {
        title: 'Ghế Thermaltake',
        url: '#',
      },
    ],
  },
  {
    title: 'Bàn Gaming',
    children: [
      {
        title: 'Bàn Warrior',
        url: '#',
      },
    ],
  },
  {
    title: 'Giá Đỡ Màn Hình/Arm',
    children: [
      {
        title: 'Giá đỡ North Bayou',
        url: '#',
      },
      {
        title: 'Giá đỡ Human Motion',
        url: '#',
      },
    ],
  },
  {
    title: 'Webcam',
    children: [
      {
        title: 'Webcam Logitech',
        url: '#',
      },
      {
        title: 'Webcam Rapoo',
        url: '#',
      },
      {
        title: 'Webcam Razer',
        url: '#',
      },
    ],
  },
]

export const sliderData = [
  {
    title: 'Gigabyte G Series_Tặng ngay RAM 8GB',
    image: 'slider1_1.jpg',
    url: '#',
  },
  {
    title: 'Samsung Official Store_Chỉ từ 300K',
    image: 'slider1_2.jpg',
    url: '#',
  },
  {
    title: 'PC MSI_Chỉ từ 10,9 triệu',
    image: 'slider1_3.jpg',
    url: '#',
  },
  {
    title: ' ROG Strix Scar 16/18_Pre-oder giảm 7 triệu',
    image: 'slider1_4.jpg',
    url: '#',
  },
  {
    title: 'Laptop CPU Gen 13_Chỉ từ 33.9 triệu',
    image: 'slider1_5.jpg',
    url: '#',
  },
]
