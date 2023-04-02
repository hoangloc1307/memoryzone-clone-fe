import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Banner from '~/components/Banner'
import useViewport from '~/hooks/useViewport'
import MainLayout from '~/layouts/MainLayout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '~/styles/globals.css'
import '~/styles/slick-theme.css'
import '~/styles/slick.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  const width = useViewport()
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => {
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <MainLayout>
      <Component {...pageProps} />
      {width > 1535 && (
        <>
          {/* Left sticky banner */}
          <div className='absolute top-5 h-full' style={{ left: 'calc((100vw - 1280px) / 2 - 120px)' }}>
            <div className='sticky top-[229px]'>
              <Banner
                image='/images/banners/sticky_sandisk_0403.png'
                url='#'
                alt='SanDisk flagship store'
                priority
                width={120}
                height={450}
              />
            </div>
          </div>
          {/* Right sticky banner */}
          <div className='absolute top-5 h-full' style={{ right: 'calc((100vw - 1280px) / 2 - 120px)' }}>
            <div className='sticky top-[229px]'>
              <Banner
                image='/images/banners/sticky_samsung_0403.png'
                url='#'
                alt='SanDisk flagship store'
                priority
                width={120}
                height={450}
              />
            </div>
          </div>
        </>
      )}
    </MainLayout>
  )
}
