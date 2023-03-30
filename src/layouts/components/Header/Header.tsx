import Image from 'next/image'
import Link from 'next/link'
import { navigationData } from '~/assets/datas/navigationData'
import useViewport from '~/hooks/useViewport'
import Category from '~/layouts/components/Category'
import Hamburger from '../Hamburger'

export default function Header() {
  const width = useViewport()

  return (
    <header className='relative z-10'>
      <div className='relative h-[60px]'>
        <Image
          src='/images/banners/banner-top.jpg'
          alt='Samsung official store'
          priority
          fill
          sizes='100vw'
          className='object-cover'
        />
      </div>
      <div className='bg-primary py-2 text-xs text-white lg:py-0 lg:text-sm'>
        <div className='c-container border-b border-white/20 pb-2 lg:pb-0'>
          <div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
            <div className='flex items-center gap-2'>
              <a href='#' className='border-r pr-2'>
                Tự build PC
              </a>
              <p>Mở cửa: 8h đến 21h từ Thứ 2 đến Chủ Nhật</p>
            </div>
            <div className='flex gap-3 sm:gap-5'>
              <a href='#' className='group flex items-center gap-0.5 py-1 sm:py-2'>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                    <path
                      fillRule='evenodd'
                      d='M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span className='group-hover:text-warn'>Tài khoản</span>
              </a>
              <a href='#' className='group flex items-center gap-0.5 py-1 sm:py-2'>
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='red'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='orange'
                    className='h-4 w-4 text-red-500'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z'
                    />
                  </svg>
                </span>
                <span className='group-hover:text-warn'>Khuyến mãi hot</span>
              </a>
              <a href='#' className='group flex items-center gap-0.5 py-1 sm:py-2'>
                <span>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                    <path
                      fillRule='evenodd'
                      d='M5.337 21.718a6.707 6.707 0 01-.533-.074.75.75 0 01-.44-1.223 3.73 3.73 0 00.814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 01-4.246.997z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
                <span className='group-hover:text-warn'>Dịch vụ doanh nghiệp</span>
              </a>
            </div>
          </div>
        </div>
        <div className='c-container'>
          <div className='grid grid-cols-12 items-center gap-y-5 py-3 lg:gap-5 lg:pb-8 lg:pt-5'>
            <div className='col-span-1 md:col-span-2 lg:hidden'>
              <Hamburger />
            </div>
            {/* Logo */}
            <div className='col-span-10 md:col-span-8 lg:col-span-3 lg:justify-self-start'>
              <Link href='/' className='relative mx-auto block h-[32px] w-[160px] lg:h-[40px] lg:w-[220px]'>
                <Image src='/images/logo.png' alt='Memoryzone' fill sizes='160px, (min-width: 1024px) 220px' />
              </Link>
            </div>
            {/* Search form */}
            <form className='relative col-span-12 flex rounded-sm bg-white p-0.5 lg:col-span-4'>
              <input
                type='text'
                className='flex-1 rounded-sm px-2 text-black outline-none'
                placeholder='Sản phẩm bạn muốn tìm...'
              />
              <button className='shrink-0 rounded-sm bg-warn px-6 py-2' type='submit'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-4 w-4'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </form>
            {/* Hotline */}
            <div className='col-span-7 flex items-center gap-2 md:hidden lg:col-span-3 lg:flex lg:justify-self-end'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white p-1'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <p className='flex flex-col'>
                <span className='font-bold'>(028) 7301 3878 (10 line)</span>
                <span className='text-[10px]'>
                  DĐ: <span className='font-bold text-warn'>0909 305 350</span>
                </span>
              </p>
            </div>
            {/* Cart */}
            <div className='col-span-5 flex items-center gap-2 justify-self-end md:col-span-2 md:col-start-11 md:row-start-1 lg:col-span-2 lg:row-start-auto'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white p-1'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path
                    fillRule='evenodd'
                    d='M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <p className='flex flex-col'>
                <span className='font-bold'>
                  (<span>0</span>) sản phẩm
                </span>
                <span className='text-[10px] text-[#ffdada]'>Giỏ hàng</span>
              </p>
            </div>
          </div>
        </div>
        {/* Category */}
        <div className='lg:bg-dark'>
          <div className='c-container'>
            <div className='relative flex'>
              {/* Product categories */}
              <Category />
              {/* Navigation */}
              <ul className='hidden flex-grow items-stretch justify-evenly bg-dark lg:flex'>
                {navigationData.map((item, index) => (
                  <li key={index}>
                    <a href='#' className='flex h-full items-center px-2 text-sm uppercase hover:text-primary'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
