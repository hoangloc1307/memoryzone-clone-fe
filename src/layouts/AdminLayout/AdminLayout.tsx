import Link from 'next/link'
import { ReactNode, useId } from 'react'
import path from '~/constants/path'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const checkboxId = useId()
  return (
    <div className='c-container relative min-h-screen lg:flex lg:h-screen lg:max-w-full lg:px-0'>
      <input type='checkbox' hidden id={checkboxId} className='peer' />
      <label
        htmlFor={checkboxId}
        className='group fixed bottom-5 right-5 z-10 rounded-full bg-primary p-2 text-white shadow lg:hidden'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-5 w-5 peer-checked:group-first-of-type:hidden'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
        </svg>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='hidden h-5 w-5 peer-checked:group-first-of-type:block'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </label>
      <aside className='fixed top-0 left-0 z-10 h-screen w-[250px] shrink-0 -translate-x-full bg-primary p-2 text-white transition-transform peer-checked:translate-x-0 lg:static lg:translate-x-0'>
        <ul>
          <li>
            <Link href={path.admin.dashboard}>Dashboard</Link>
          </li>
          <li>
            <Link href={path.admin.products}>Sản phẩm</Link>
          </li>
          <li>
            <Link href={path.home}>Trang web</Link>
          </li>
        </ul>
      </aside>
      <main className='grow overflow-y-auto lg:p-5'>{children}</main>
    </div>
  )
}
