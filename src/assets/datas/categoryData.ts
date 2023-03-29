export interface HeaderCategory {
  title: string
  url: string
  icon: string
  children?: HeaderCategory[]
}

export const categoryData = [
  {
    title: 'Chuột - Bàn phím - Tai nghe',
    url: '/categories/laptop',
    icon: 'i_menu_1.png',
    children: [
      {
        title: 'Thương hiệu chuột',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: 'Corsair',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Logitech',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Razer',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'HyperX',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'SteelSeries',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'MSI',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Zowie',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Dell',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
      {
        title: 'Mức giá chuột',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: 'Dưới 500 ngàn',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: '500 ngàn - 1 triệu',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: '1 triệu - 2 triệu',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: '2 triệu - 3 triệu',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Trên 3 triệu',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
      {
        title: 'Nhu cầu chuột',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: 'Văn phòng',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Gaming',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Công thái học',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Không dây - Wireless',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Bluetooth',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
      {
        title: 'Phụ kiện chuột',
        url: '/categories/laptop',
        icon: '',
      },
      {
        title: 'Thương hiệu bàn phím',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: 'Corsair',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Logitech',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Keychron',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Akko - MonsGeek',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'HyperX',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'FL Esports',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'HyperWork',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Razer',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'DareU',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
    ],
  },
  {
    title: 'Laptop',
    url: '/categories/laptop',
    icon: 'i_menu_2.png',
    children: [
      {
        title: 'Thương hiệu laptop',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: 'MSI',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: 'Asus',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
      {
        title: 'Mức giá laptop',
        url: '/categories/laptop',
        icon: '',
        children: [
          {
            title: '5 - 10 triệu',
            url: '/categories/laptop',
            icon: '',
          },
          {
            title: '10 - 15 triệu',
            url: '/categories/laptop',
            icon: '',
          },
        ],
      },
    ],
  },
  {
    title: 'PC / Máy bộ',
    url: '/categories/laptop',
    icon: 'i_menu_3.png',
  },
  {
    title: 'Lifestyle - Livestream setup',
    url: '/categories/laptop',
    icon: 'i_menu_4.png',
  },
  {
    title: 'Linh kiện PC / Laptop',
    url: '/categories/laptop',
    icon: 'i_menu_5.png',
  },
  {
    title: 'SSD',
    url: '/categories/laptop',
    icon: 'i_menu_6.png',
  },
  {
    title: 'RAM',
    url: '/categories/laptop',
    icon: 'i_menu_7.png',
  },
  {
    title: 'Ổ cứng',
    url: '/categories/laptop',
    icon: 'i_menu_8.png',
  },
  {
    title: 'Điện thoại',
    url: '/categories/laptop',
    icon: 'i_menu_13.png',
  },
  {
    title: 'Giải pháp NAS',
    url: '/categories/laptop',
    icon: 'i_menu_14.png',
  },
  {
    title: 'Dịch vụ thu phí',
    url: '/categories/laptop',
    icon: 'i_menu_15.png',
  },
]

export const hotCategoriesData = [
  {
    icon: 'ssd_icon.png',
    title: 'SSD',
    url: '/categories/laptop',
  },
  {
    icon: 'ram_icon.png',
    title: 'RAM',
    url: '/categories/laptop',
  },
  {
    icon: 'the_nho_icon.png',
    title: 'Thẻ nhớ',
    url: '/categories/laptop',
  },
  {
    icon: 'phu_kien_icon.png',
    title: 'Phụ kiện',
    url: '/categories/laptop',
  },
  {
    icon: 'o_cung_di_dong_icon.png',
    title: 'Ổ cứng di động',
    url: '/categories/laptop',
  },
  {
    icon: 'o_cung_ssd_di_dong_icon.png',
    title: 'Ổ cứng SSD di động',
    url: '/categories/laptop',
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
