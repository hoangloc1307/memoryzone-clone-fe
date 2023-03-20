import classNames from 'classnames'
import Head from 'next/head'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { bannerData } from '~/assets/datas/bannerData'
import { hotCategoriesData } from '~/assets/datas/hotCategoriesData'
import { productData } from '~/assets/datas/productData'
import Banner from '~/components/Banner'
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
                sizes={banner.sizes}
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
        <section className='relative mt-10'>
          <div className='border-b-2 border-primary'>
            <h2 className='inline-block rounded-t bg-primary py-2.5 px-4 text-sm font-semibold uppercase text-white'>
              Laptop
            </h2>
            <input
              type={'checkbox'}
              className='peer'
              hidden
              id='category-laptop'
            />
            <ul className='absolute left-0 top-[42px] max-h-0 w-full overflow-hidden bg-white px-3 text-sm shadow transition-all duration-300 ease-in-out peer-checked:max-h-[216px]'>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  Văn phòng
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  Gaming
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  Intel EVO
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  NVIDIA Studio
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  AMD Advantage
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block py-1.5'
                >
                  Xem tất cả
                </a>
              </li>
            </ul>
            {/* Mai làm tiếp */}
            <label
              htmlFor='category-laptop'
              className='peer-checked:group absolute top-1/2 right-0 flex h-10 -translate-y-1/2 flex-col gap-2 overflow-hidden p-2 pr-0'
            >
              <span className='group-first-of-type:text-primary'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm0 4.5A.75.75 0 013 8.25h9.75a.75.75 0 010 1.5H3A.75.75 0 012.25 9zm15-.75A.75.75 0 0118 9v10.19l2.47-2.47a.75.75 0 111.06 1.06l-3.75 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 111.06-1.06l2.47 2.47V9a.75.75 0 01.75-.75zm-15 5.25a.75.75 0 01.75-.75h9.75a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    fillRule='evenodd'
                    d='M2.25 4.5A.75.75 0 013 3.75h14.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm14.47 3.97a.75.75 0 011.06 0l3.75 3.75a.75.75 0 11-1.06 1.06L18 10.81V21a.75.75 0 01-1.5 0V10.81l-2.47 2.47a.75.75 0 11-1.06-1.06l3.75-3.75zM2.25 9A.75.75 0 013 8.25h9.75a.75.75 0 010 1.5H3A.75.75 0 012.25 9zm0 4.5a.75.75 0 01.75-.75h5.25a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
            </label>
          </div>
        </section>
      </div>
    </>
  )
}
