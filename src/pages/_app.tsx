import type { AppProps } from 'next/app'
import Banner from '~/components/Banner'
import MainLayout from '~/layouts/MainLayout'
import '~/styles/globals.css'
import '~/styles/slick-theme.css'
import '~/styles/slick.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
      {/* Left sticky banner */}
      <div
        className='absolute top-0 hidden h-full 2xl:block'
        style={{ left: 'calc((100vw - 1280px) / 2 - 120px)' }}
      >
        <div className='sticky top-[217px]'>
          <Banner
            image='/images/banners/sticky_sandisk_0403.png'
            url='#'
            alt='SanDisk flagship store'
            width={120}
            height={450}
          />
        </div>
      </div>
      {/* Right sticky banner */}
      <div
        className='absolute top-0 hidden h-full 2xl:block'
        style={{ right: 'calc((100vw - 1280px) / 2 - 120px)' }}
      >
        <div className='sticky top-[217px]'>
          <Banner
            image='/images/banners/sticky_samsung_0403.png'
            url='#'
            alt='SanDisk flagship store'
            width={120}
            height={450}
          />
        </div>
      </div>
    </MainLayout>
  )
}
