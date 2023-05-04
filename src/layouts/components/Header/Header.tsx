import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import Popover from '~/components/Popover'
import path from '~/constants/path'
import { navigationData } from '~/datas/navigationData'
import Category from '~/layouts/components/Category'
import Cart from '../Cart'
import Hamburger from '../Hamburger'
import SearchBox from '../SearchBox'
import { memo, useCallback } from 'react'
import useAuthAxios from '~/hooks/useAuthAxios'
import { ChatBubbleOvalLeftEllipsisIcon, FireIcon, PhoneIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Header = () => {
  const { data: session } = useSession()
  const http = useAuthAxios()

  const handleLogout = useCallback(() => {
    http
      .delete('/auth/logout')
      .then(() => signOut({ callbackUrl: window.location.origin }))
      .catch(() => undefined)
  }, [http])

  return (
    <header className='relative z-10'>
      <Image src='/images/banners/banner-top.jpg' alt='Samsung official store' priority width={1920} height={0} />
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
              {/* Account */}
              <Popover
                floatingElement={
                  <div className='flex w-[200px] flex-col gap-2 rounded bg-white py-2 text-[#444] shadow'>
                    {!session && (
                      <>
                        <Link href={path.login} className='px-2 hover:text-primary hover:underline'>
                          Đăng nhập
                        </Link>
                        <Link href={path.register} className='px-2 hover:text-primary hover:underline'>
                          Đăng ký
                        </Link>
                      </>
                    )}
                    {session && (
                      <>
                        {session.user.role === 'ADMIN' && (
                          <Link href={path.admin.dashboard} className='px-2 hover:text-primary hover:underline'>
                            Quản lý trang web
                          </Link>
                        )}
                        <Link href={path.me} className='px-2 hover:text-primary hover:underline'>
                          Thông tin của tôi
                        </Link>
                        <button className='px-2 text-left hover:text-primary hover:underline' onClick={handleLogout}>
                          Đăng xuất
                        </button>
                      </>
                    )}
                  </div>
                }
                placement='bottom'
                showArrow
              >
                <div className='flex cursor-default items-center gap-0.5 py-1 sm:py-2'>
                  <UserCircleIcon className='h-4 w-4' />
                  <span>{session?.user?.name || 'Tài khoản'}</span>
                </div>
              </Popover>
              {/* Hot sale */}
              <a href='#' className='group flex items-center gap-0.5 py-1 sm:py-2'>
                <FireIcon className='h-4 w-4 text-red-500' stroke='orange' />
                <span className='group-hover:text-warn'>Khuyến mãi hot</span>
              </a>
              <a href='#' className='group flex items-center gap-0.5 py-1 sm:py-2'>
                <ChatBubbleOvalLeftEllipsisIcon className='h-4 w-4' />
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
              <Link href={path.home} className='relative mx-auto block h-[32px] w-[160px] lg:h-[40px] lg:w-[220px]'>
                <Image src='/images/logo.png' alt='Memoryzone' fill sizes='160px, (min-width: 1024px) 220px' />
              </Link>
            </div>
            {/* Search form */}
            <div className='relative col-span-12 lg:col-span-4'>
              <SearchBox />
            </div>
            {/* Hotline */}
            <div className='col-span-7 flex items-center gap-2 md:hidden lg:col-span-3 lg:flex lg:justify-self-end'>
              <span className='flex h-10 w-10 items-center justify-center rounded-full border-2 border-white p-1'>
                <PhoneIcon className='h-4 w-4' />
              </span>
              <p className='flex flex-col'>
                <span className='font-bold'>(028) 7301 3878 (10 line)</span>
                <span className='text-[10px]'>
                  DĐ: <span className='font-bold text-warn'>0909 305 350</span>
                </span>
              </p>
            </div>
            {/* Cart */}
            <div className='col-span-5 md:col-span-2 md:col-start-11 md:row-start-1 lg:col-span-2 lg:row-start-auto'>
              <Cart />
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

export default memo(Header)
