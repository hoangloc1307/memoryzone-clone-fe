import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ReactElement, ReactNode, useEffect } from 'react'
import Banner from '~/components/Banner'
import layout from '~/constants/layout'
import useViewport from '~/hooks/useViewport'
import AdminLayout from '~/layouts/AdminLayout'
import AuthenticationLayout from '~/layouts/AuthenticationLayout'
import MainLayout from '~/layouts/MainLayout'
import '~/styles/globals.css'
import '~/styles/slick-theme.css'
import '~/styles/slick.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  layout?: string
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
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

  const layouts = {
    [layout.admin]: (page: ReactElement) => <AdminLayout>{page}</AdminLayout>,
    [layout.main]: (page: ReactElement) => (
      <MainLayout>
        <>
          {page}
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
        </>
      </MainLayout>
    ),
    [layout.auth]: (page: ReactElement) => <AuthenticationLayout>{page}</AuthenticationLayout>,
  }

  // @ts-ignore
  const getLayout = layouts[Component.layout ?? layout.main]

  return <SessionProvider session={pageProps.session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
}
