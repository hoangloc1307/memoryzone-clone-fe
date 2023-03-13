import Image from 'next/image'
import useViewport from '~/hooks/useViewport'
import banner_mobile from '../../../../public/images/banners/banner-top-mobile.jpg'
import banner from '../../../../public/images/banners/banner-top.jpg'
import logo from '../../../../public/images/logo.png'
import Hamburger from '../Hamburger'

export default function Header() {
  const width = useViewport()

  return (
    <header>
      <div className='relative h-[60px]'>
        <Image
          src={width > 500 ? banner : banner_mobile}
          alt='Samsung official store'
          priority
          fill
        />
      </div>
      <div className='divide-y divide-white/20 bg-primary text-xs text-white'>
        <div className='c-container flex flex-col items-center justify-between gap-2 py-2 md:flex-row'>
          <div className='flex gap-2'>
            <a
              href='#'
              className='border-r pr-2'
            >
              Tự build PC
            </a>
            <p>Mở cửa: 8h đến 21h từ Thứ 2 đến Chủ Nhật</p>
          </div>
          <div className='flex gap-1'>
            <a
              href='#'
              className='group flex items-center gap-1 p-2'
            >
              <span>
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
                    d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </span>
              <span className='group-hover:text-second'>Tài khoản</span>
            </a>
            <a
              href='#'
              className='group flex items-center gap-1 p-2'
            >
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
              <span className='group-hover:text-second'>Khuyến mãi hot</span>
            </a>
            <a
              href='#'
              className='group flex items-center gap-1 p-2'
            >
              <span>
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
                    d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
                  />
                </svg>
              </span>
              <span className='group-hover:text-second'>Dịch vụ doanh nghiệp</span>
            </a>
          </div>
        </div>
        <div>
          <Hamburger />
          <a href='#'>
            <Image
              src={logo}
              priority
              alt='Memoryzone'
            />
          </a>
        </div>
      </div>
    </header>
  )
}
