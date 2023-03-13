import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from '~/layouts/MainLayout'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  )
}
