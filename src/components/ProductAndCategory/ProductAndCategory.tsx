import classNames from 'classnames'
import { useId, useRef } from 'react'
import type { Settings } from 'react-slick'
import Slider from 'react-slick'
import useViewport from '~/hooks/useViewport'
import { Banner as BannerType } from '~/types/banner.type'
import { Product2 } from '~/types/product.type'
import Banner from '../Banner'
import ProductItem from '../ProductItem'
import { BarsArrowDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

interface Props {
  data: {
    category: string
    url: string
    children: {
      category: string
      url: string
    }[]
    products: Product2[]
    banners: BannerType[]
  }
  bannerPosition?: 'left' | 'right'
}

export default function ProductAndCategory({ data, bannerPosition = 'left' }: Props) {
  const inputId = useId()
  const width = useViewport()
  const slickRef = useRef<Slider>(null)

  const settings: Settings = {
    rows: 2,
    slidesToShow: 4,
    swipeToSlide: true,
    autoplay: true,
    className: 'shadow-inner border-x-1 rounded shadow-slate-200 pr-2 pl-1',
    arrows: false,
    pauseOnHover: true,
  }

  return (
    <>
      {data && (
        <div>
          {/* Categories bar */}
          <div className='relative border-b-2 border-primary lg:flex lg:justify-between'>
            <h2 className='inline-block rounded-t bg-primary py-2.5 px-4 text-sm font-semibold uppercase text-white'>
              {data.category}
            </h2>
            <input type={'checkbox'} className='peer' hidden id={inputId} />
            {/* Drop down */}
            <ul className='absolute left-0 top-[42px] z-10 max-h-0 w-full overflow-hidden rounded-b-lg border-2 border-t-0 border-primary bg-white px-3 text-sm transition-all duration-700 ease-in-out peer-checked:max-h-[216px] lg:static lg:flex lg:max-h-max lg:w-max lg:items-center lg:gap-4 lg:border-none lg:px-0'>
              {data.children.map((item, index) => (
                <li key={index} className='hover:text-primary lg:text-[#444]'>
                  <a href={item.url} className='block py-1.5 capitalize'>
                    {item.category}
                  </a>
                </li>
              ))}
              <li className='hidden  lg:list-item lg:text-[#444]'>
                <div className='flex'>
                  <ChevronLeftIcon
                    className='h-8 w-8 cursor-pointer p-1 hover:text-primary'
                    onClick={() => slickRef.current?.slickPrev()}
                  />
                  <ChevronRightIcon
                    className='h-8 w-8 cursor-pointer p-1 hover:text-primary'
                    onClick={() => slickRef.current?.slickNext()}
                  />
                </div>
              </li>
            </ul>
            {/* Icon drop down */}
            <label
              htmlFor={inputId}
              className='absolute top-1/2 right-0 h-10 -translate-y-1/2 p-2 pr-0 transition-transform duration-700 peer-checked:rotate-[540deg] peer-checked:text-primary lg:hidden'
            >
              <BarsArrowDownIcon className='h-6 w-6' />
            </label>
          </div>
          {/* Product list */}
          <div className='mt-2 grid grid-cols-4 gap-3'>
            {/* Products */}
            {width < 1024 ? (
              <div className='col-span-4 overflow-x-scroll rounded-b border-x border-slate-100 shadow-inner sm:col-span-3'>
                <ul className='grid grid-cols-[repeat(6,calc((100vw-24px-12px*3)/2))] gap-3 p-3 sm:grid-cols-[repeat(6,calc((100vw-24px-12px*5)/4))] md:grid-cols-[repeat(6,calc((100vw-32px-12px*5)/4))]'>
                  {data.products.map((product) => (
                    <li key={product.id}>
                      <ProductItem product={product} showDiscountPercent showRating />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className='col-span-4 sm:col-span-3'>
                <Slider {...settings} ref={slickRef}>
                  {data.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      showDiscountPercent
                      showRating
                      customClass={{
                        wrapper: 'mx-1.5 my-3',
                      }}
                    />
                  ))}
                </Slider>
              </div>
            )}
            {/* Banners */}
            <div
              className={classNames('col-span-4 sm:col-span-1', {
                'sm:col-start-1 sm:row-start-1': bannerPosition === 'left',
              })}
            >
              <div className='grid h-full auto-rows-[200px] grid-cols-2 gap-2 py-1.5 sm:auto-rows-fr sm:grid-cols-1 sm:content-start'>
                {data.banners.map((banner, index) => (
                  <div key={index}>
                    <Banner
                      image={`/images/banners/${banner.image}`}
                      url={banner.url}
                      alt={banner.alt}
                      fill
                      className={`object-contain ${
                        bannerPosition === 'left' ? 'sm:object-left-top' : 'sm:object-right-top'
                      }`}
                      sizes='(max-width: 639px) 256px, (max-width: 1023) 20vw, 291px'
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
