import { ArrowLongUpIcon } from '@heroicons/react/24/outline'
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
          <ArrowLongUpIcon className='h-6 w-6' />
        </span>
      </div>
    </>
  )
}
