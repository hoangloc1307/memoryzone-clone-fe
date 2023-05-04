import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { navigationData } from '~/datas/navigationData'
import path from '~/constants/path'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Hamburger() {
  const [show, setShow] = useState(false)

  return (
    <>
      {/* Icon */}
      <Bars3Icon className='h-6 w-6' onClick={() => setShow((prev) => !prev)} />

      {/* Popover */}
      <div
        className={classnames(
          'fixed top-0 left-0 z-20 h-full w-[300px] bg-primary shadow-2xl transition-transform duration-300 ease-in-out',
          {
            'translate-x-[-300px]': !show,
          }
        )}
      >
        <div className='bg-warn'>
          <Link href={path.home} className='block h-20 p-3'>
            <div className='relative h-full'>
              <Image src='/images/logo.png' alt='Memoryzone' fill className='object-cover' sizes='276px' />
            </div>
          </Link>
        </div>
        <ul className='divide-y font-normal text-white'>
          {navigationData.map((item, index) => (
            <li key={index}>
              <a href='#' className='block py-2 pl-8 pr-2 uppercase'>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Overlay */}
      {show && <div className='fixed inset-0 z-10 bg-black/30' onClick={() => setShow(false)}></div>}
    </>
  )
}
