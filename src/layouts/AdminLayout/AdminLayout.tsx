import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'
import { ReactNode, useId } from 'react'
import { AdminNavigation, adminNavigation } from '~/datas/navigationData'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  const checkboxId = useId()

  const renderMenu = (list: AdminNavigation[], level: number) => {
    return (
      <ul>
        {list.length > 0 &&
          list.map((item, index) => (
            <li
              key={index}
              className={classNames({
                'pl-5': level !== 0,
              })}
            >
              <Link href={item.link} className='block py-1 hover:underline'>
                {item.title}
              </Link>
              {item.children.length > 0 && renderMenu(item.children, level + 1)}
            </li>
          ))}
      </ul>
    )
  }

  return (
    <div className='c-container relative min-h-screen lg:flex lg:h-screen lg:max-w-full lg:px-0'>
      {/* Button show aside on mobile */}
      <input type='checkbox' hidden id={checkboxId} className='peer' />
      <label
        htmlFor={checkboxId}
        className='group fixed bottom-5 right-5 z-50 rounded-full bg-primary p-2 text-white ring ring-white lg:hidden'
      >
        <Bars3Icon className='h-5 w-5 peer-checked:group-first-of-type:hidden' />
        <XMarkIcon className='hidden h-5 w-5 peer-checked:group-first-of-type:block' />
      </label>
      {/* Aside */}
      <aside className='fixed top-0 left-0 z-10 h-screen w-[250px] shrink-0 -translate-x-full bg-primary p-2 text-white transition-transform peer-checked:translate-x-0 lg:static lg:translate-x-0'>
        {renderMenu(adminNavigation, 0)}
      </aside>
      {/* Main */}
      <main className='grow overflow-y-auto py-5 lg:p-5'>{children}</main>
    </div>
  )
}
