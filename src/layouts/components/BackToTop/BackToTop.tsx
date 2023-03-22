import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { isBrowser } from '~/utils/utils'

export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (isBrowser) {
      const handleScroll = () => {
        setShow(window.scrollY >= 1000)
      }

      window.addEventListener('scroll', handleScroll)

      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const ScrollToTop = () => {
    if (isBrowser) {
      window.scrollTo({
        top: 0,
      })
    }
  }

  return (
    <>
      <div
        className={classNames(
          'group fixed bottom-5 right-5 z-10 cursor-pointer transition-transform duration-500 ease-in-out',
          {
            'translate-y-20': !show,
          }
        )}
        onClick={ScrollToTop}
      >
        <span className='absolute -z-10 h-full w-full rounded-full bg-primary/50 group-hover:animate-ping'></span>
        <span className='block rounded-full bg-primary p-3 text-white'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='h-6 w-6'
          >
            <path
              fillRule='evenodd'
              d='M11.47 2.47a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06l-2.47-2.47V21a.75.75 0 01-1.5 0V4.81L8.78 7.28a.75.75 0 01-1.06-1.06l3.75-3.75z'
              clipRule='evenodd'
            />
          </svg>
        </span>
      </div>
    </>
  )
}
