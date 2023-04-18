import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { ReactElement, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import layout from '~/constants/layout'
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
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
    [layout.main]: (page: ReactElement) => <MainLayout>{page}</MainLayout>,
    [layout.auth]: (page: ReactElement) => <AuthenticationLayout>{page}</AuthenticationLayout>,
  }

  // @ts-ignore
  const getLayout = layouts[Component.layout ?? layout.main]

  return (
    <SessionProvider session={pageProps.session} refetchOnWindowFocus={false}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer />
    </SessionProvider>
  )
}
