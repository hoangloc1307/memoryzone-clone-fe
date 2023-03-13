import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import logo from '../../../../public/images/logo.png'

export default function Hamburger() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <span onClick={() => setShow((prev) => !prev)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-6 w-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      </span>

      <div
        className={classnames(
          'fixed top-0 left-0 z-20 h-full w-[300px] bg-primary transition-transform duration-300 ease-in-out',
          {
            'translate-x-[-300px]': !show,
          }
        )}
      >
        <div className='bg-second'>
          <Link
            href='/'
            className='block h-20 p-3'
          >
            <div className='relative h-full'>
              <Image
                src={logo}
                alt='Memoryzone'
                priority
                fill
                className='object-cover'
              />
            </div>
          </Link>
        </div>
        <ul className='divide-y font-normal text-white'>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Thanh toán
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Trả góp
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Liên hệ
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Chăm sóc khách hàng
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Thư viện
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 pl-8 pr-2 uppercase'
            >
              Tuyển dụng
            </a>
          </li>
        </ul>
      </div>

      {show && (
        <div
          className='fixed inset-0 z-10 bg-black/30'
          onClick={() => setShow(false)}
        ></div>
      )}
    </div>
  )
}
