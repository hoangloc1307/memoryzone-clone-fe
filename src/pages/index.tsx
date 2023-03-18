import Banner from '~/components/Banner'
import Slider from '~/components/Slider'

export default function Home() {
  return (
    <div className='c-container'>
      {/* Slider */}
      <section className='my-5 grid grid-cols-12 gap-2'>
        <div className='col-span-12 md:col-span-9'>
          <Slider />
        </div>
        <div className='col-span-12 grid grid-cols-2 content-start gap-2 md:col-span-3 md:grid-cols-1 lg:[align-content:unset]'>
          <div className='aspect-[325/277] lg:aspect-auto'>
            <Banner
              image='/images/banners/banner_slider_1.jpg'
              url='#'
              alt='Ổ cứng chính hãng'
              sizes='(max-width: 1024px) 100vw, 33vw'
            />
          </div>
          <div className='aspect-[325/277] lg:aspect-auto'>
            <Banner
              image='/images/banners/banner_slider_2.jpg'
              url='#'
              alt='Gear chính hãng'
              sizes='(max-width: 1024px) 100vw, 33vw'
            />
          </div>
        </div>
      </section>
      {/* Banner */}
      <section></section>
    </div>
  )
}
