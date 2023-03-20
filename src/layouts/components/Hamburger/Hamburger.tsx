import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { navigationData } from '~/assets/datas/navigationData'

interface Props {
  classNameWrapper?: string
}

export default function Hamburger({ classNameWrapper }: Props) {
  const [show, setShow] = useState(false)

  return (
    <div className={classNameWrapper}>
      {/* Icon */}
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

      {/* Popover */}
      <div
        className={classnames(
          'fixed top-0 left-0 z-20 h-full w-[300px] bg-primary shadow-2xl transition-transform duration-300 ease-in-out',
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
                src='/images/logo.png'
                alt='Memoryzone'
                fill
                className='object-cover'
                sizes='276px'
              />
            </div>
          </Link>
        </div>
        <ul className='divide-y font-normal text-white'>
          {navigationData.map((item, index) => (
            <li key={index}>
              <a
                href='#'
                className='block py-2 pl-8 pr-2 uppercase'
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay */}
      {show && (
        <div
          className='fixed inset-0 z-10 bg-black/30'
          onClick={() => setShow(false)}
        ></div>
      )}
    </div>
  )
}
