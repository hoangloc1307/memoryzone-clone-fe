import path from '~/constants/path'

export const navigationData = ['Thanh toán', 'Trả góp', 'Liên hệ', 'Chăm sóc khách hàng', 'Thư viện', 'Tuyển dụng']

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

export interface AdminNavigation {
  title: string
  link: string
  children: AdminNavigation[]
}

export const adminNavigation = [
  {
    title: 'Dashboard',
    link: path.admin.dashboard,
    children: [],
  },
  {
    title: 'Sản phẩm',
    link: path.admin.products,
    children: [
      {
        title: 'Tất cả sản phẩm',
        link: path.admin.products,
        children: [],
      },
      {
        title: 'Thuộc tính sản phẩm',
        link: path.admin.productAttributes,
        children: [],
      },
    ],
  },
  {
    title: 'Trang web',
    link: path.home,
    children: [],
  },
]
