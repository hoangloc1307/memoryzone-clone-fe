import classNames from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import { bannerData } from '~/assets/datas/bannerData'
import { hotCategoriesData } from '~/assets/datas/hotCategoriesData'
import { productAndCategoryData } from '~/assets/datas/productAndCategoryData'
import { productData } from '~/assets/datas/productData'
import Banner from '~/components/Banner'
import ProductAndCategory from '~/components/ProductAndCategory'
import ProductItem from '~/components/ProductItem'
import Slider from '~/components/Slider'

export default function Home() {
  return (
    <>
      <Head>
        <title>Memoryclone</title>
      </Head>

      <div className='c-container'>
        {/* Slider */}
        <section className='mt-5 grid grid-cols-12 gap-2'>
          <div className='col-span-12 md:col-span-9'>
            <Slider />
          </div>
          <div className='col-span-12 grid grid-cols-2 content-start gap-2 md:col-span-3 md:grid-cols-1 lg:[align-content:unset]'>
            <div className='aspect-[325/277] lg:aspect-auto'>
              <Banner
                image='/images/banners/banner_slider_1.jpg'
                url='#'
                alt='Ổ cứng chính hãng'
                fill
                sizes='(max-width: 1023px) 50vw, 33vw'
              />
            </div>
            <div className='aspect-[325/277] lg:aspect-auto'>
              <Banner
                image='/images/banners/banner_slider_2.jpg'
                url='#'
                alt='Gear chính hãng'
                fill
                sizes='(max-width: 1023px) 50vw, 33vw'
              />
            </div>
          </div>
        </section>
        {/* Banner */}
        <section className='mt-2 grid grid-cols-4 gap-2 sm:grid-flow-col sm:grid-cols-6'>
          {bannerData.map((banner, index) => (
            <div
              key={index}
              className={classNames({
                'col-span-2 aspect-[2/1]': banner.alt !== 'PC Siêu Tốc',
                'col-span-2 row-span-2 h-full sm:col-start-3 sm:row-start-1': banner.alt === 'PC Siêu Tốc',
              })}
            >
              <Banner
                image={`/images/banners/${banner.image}`}
                alt={banner.alt}
                url={banner.url}
                fill
                sizes='(max-width: 1023px) 50vw, 33vw'
              />
            </div>
          ))}
        </section>
        {/* Hot categories */}
        <section className='mt-10'>
          <div className='grid grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
            <h2 className='flex items-center justify-center rounded-md bg-primary py-2 text-center text-xs font-semibold uppercase text-white'>
              Danh mục quan tâm
            </h2>
            <a
              href='#'
              className='flex cursor-pointer items-center justify-center rounded-md bg-primary py-2 text-center text-xs font-semibold uppercase text-white'
            >
              Tự build PC
            </a>
          </div>
          <ul className='mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6'>
            {hotCategoriesData.map((item, index) => (
              <li key={index}>
                <a
                  href={item.url}
                  className='flex flex-col items-center gap-2'
                >
                  <span>
                    <Image
                      src={`/images/categories/${item.icon}`}
                      alt={item.title}
                      width={68}
                      height={68}
                    />
                  </span>
                  <h3 className='text-sm font-medium capitalize text-primary lg:text-base'>{item.title}</h3>
                </a>
              </li>
            ))}
          </ul>
        </section>
        {/* For you */}
        <section className='mt-10'>
          <h2 className='border-b-2 border-primary text-base font-semibold uppercase leading-8'>Dành riêng cho bạn</h2>
          <ul className='mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {productData.map((product) => (
              <li key={product.id}>
                <ProductItem
                  product={product}
                  showRating
                  showDiscountPercent
                />
              </li>
            ))}
          </ul>
        </section>
        {/* Laptop */}
        <section className='mt-10'>
          <ProductAndCategory data={productAndCategoryData[0]} />
        </section>
      </div>
    </>
  )
}
