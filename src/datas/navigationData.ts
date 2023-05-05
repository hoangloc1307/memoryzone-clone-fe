import path from '~/constants/path'
import { ChartPieIcon, ComputerDesktopIcon, PhotoIcon, GlobeAltIcon } from '@heroicons/react/24/solid'

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
  icon?: any
  children: AdminNavigation[]
}

export const adminNavigation = [
  {
    title: 'Dashboard',
    link: path.admin.dashboard,
    icon: ChartPieIcon,
    children: [],
  },
  {
    title: 'Sản phẩm',
    link: path.admin.products,
    icon: ComputerDesktopIcon,
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
      {
        title: 'Danh mục sản phẩm',
        link: path.admin.productCategories,
        children: [],
      },
    ],
  },
  {
    title: 'Quản lý hình ảnh',
    link: path.admin.images,
    icon: PhotoIcon,
    children: [],
  },
  {
    title: 'Trang web',
    link: path.home,
    icon: GlobeAltIcon,
    children: [],
  },
]
