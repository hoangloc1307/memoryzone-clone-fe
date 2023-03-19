import classNames from 'classnames'
import { bannerData } from '~/assets/data'
import Banner from '~/components/Banner'
import Slider from '~/components/Slider'

export default function Home() {
  return (
    <div className='c-container'>
      {/* Slider */}
      <section className='mt-5 mb-2 grid grid-cols-12 gap-2'>
        <div className='col-span-12 md:col-span-9'>
          <Slider />
        </div>
        <div className='col-span-12 grid grid-cols-2 content-start gap-2 md:col-span-3 md:grid-cols-1 lg:[align-content:unset]'>
          <div className='aspect-[325/277] lg:aspect-auto'>
            <Banner
              image='/images/banners/banner_slider_1.jpg'
              url='#'
              alt='Ổ cứng chính hãng'
              sizes='(max-width: 1023px) 50vw, 33vw'
            />
          </div>
          <div className='aspect-[325/277] lg:aspect-auto'>
            <Banner
              image='/images/banners/banner_slider_2.jpg'
              url='#'
              alt='Gear chính hãng'
              sizes='(max-width: 1023px) 50vw, 33vw'
            />
          </div>
        </div>
      </section>
      {/* Banner */}
      <section className='grid grid-cols-4 gap-2 sm:grid-flow-col sm:grid-cols-6'>
        {bannerData.map((banner, index) => (
          <div
            key={index}
            className={classNames({
              'col-span-2 aspect-[2/1]': banner.alt !== 'PC Siêu Tốc',
              'col-span-2 row-span-2 aspect-square sm:col-start-3 sm:row-start-1': banner.alt === 'PC Siêu Tốc',
            })}
          >
            <Banner
              image={`/images/banners/${banner.image}`}
              alt={banner.alt}
              url={banner.url}
              sizes={banner.sizes}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
