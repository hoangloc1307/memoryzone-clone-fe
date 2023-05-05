import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
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
      <ul
        className={classNames('space-y-2 font-medium', {
          'max-h-0 overflow-hidden peer-checked:max-h-max peer-checked:py-2': level !== 0,
        })}
      >
        {list.length > 0 &&
          list.map((item, index) => {
            const Icon = item.icon
            return (
              <li key={index}>
                {item.children.length === 0 && (
                  <Link
                    href={item.link}
                    className={classNames(
                      'flex items-center rounded-lg p-2 text-white hover:bg-white hover:text-primary',
                      {
                        'w-full pl-11': level !== 0,
                      }
                    )}
                  >
                    {Icon && <Icon className='h-6 w-6' />}
                    <span
                      className={classNames({
                        'ml-3': level === 0,
                      })}
                    >
                      {item.title}
                    </span>
                  </Link>
                )}

                {item.children.length > 0 && (
                  <>
                    <input type='checkbox' hidden id={`checkbox-${index}`} className='peer' />
                    <label
                      htmlFor={`checkbox-${index}`}
                      className='group flex w-full cursor-pointer select-none items-center rounded-lg p-2 text-white hover:bg-white hover:text-primary'
                    >
                      {Icon && <Icon className='h-6 w-6 flex-shrink-0' />}
                      <span className='ml-3 flex-1 whitespace-nowrap text-left'>{item.title}</span>
                      <ChevronDownIcon className='h-6 w-6 peer-checked:group-first-of-type:rotate-180' />
                    </label>
                    {renderMenu(item.children, level + 1)}
                  </>
                )}
              </li>
            )
          })}
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
      <aside className='fixed top-0 left-0 z-10 h-screen w-64 shrink-0 -translate-x-full overflow-y-auto bg-primary px-3 py-4 text-white transition-transform peer-checked:translate-x-0 lg:static lg:translate-x-0'>
        {renderMenu(adminNavigation, 0)}
      </aside>
      {/* Main */}
      <main className='grow overflow-y-auto py-5 lg:p-5'>{children}</main>
    </div>
  )
}
