import { useId } from 'react'
import { Banner as BannerType } from '~/types/banner.type'
import { Product } from '~/types/product.type'
import Banner from '../Banner'
import ProductItem from '../ProductItem'

interface Props {
  data: {
    category: string
    url: string
    children: {
      category: string
      url: string
    }[]
    products: Product[]
    banners: BannerType[]
  }
}

export default function ProductAndCategory({ data }: Props) {
  const inputId = useId()
  return (
    <div>
      {/* Categories bar */}
      <div className='relative border-b-2 border-primary lg:flex lg:justify-between'>
        <h2 className='inline-block rounded-t bg-primary py-2.5 px-4 text-sm font-semibold uppercase text-white'>
          {data.category}
        </h2>
        <input
          type={'checkbox'}
          className='peer'
          hidden
          id={inputId}
        />
        <ul className='absolute left-0 top-[42px] z-10 max-h-0 w-full overflow-hidden bg-white px-3 text-sm shadow transition-all duration-700 ease-in-out peer-checked:max-h-[216px] lg:static lg:flex lg:max-h-max lg:w-max lg:items-center lg:gap-4 lg:px-0 lg:shadow-none'>
          {data.children.map((item, index) => (
            <li
              key={index}
              className='hover:text-primary lg:text-[#444]'
            >
              <a
                href={item.url}
                className='block py-1.5'
              >
                {item.category}
              </a>
            </li>
          ))}
        </ul>
        <label
          htmlFor={inputId}
          className='absolute top-1/2 right-0 h-10 -translate-y-1/2 p-2 pr-0 transition-transform duration-700 peer-checked:-rotate-[540deg] lg:hidden'
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
        </label>
      </div>
      {/* Product list */}
      <div className='grid grid-cols-4 gap-3'>
        {/* Products */}
        <div className='col-span-4 overflow-x-scroll rounded-b border-x border-slate-100 shadow-inner sm:col-span-3'>
          <ul className='grid grid-cols-[repeat(12,calc((100vw-24px-12px*2)/3))] gap-3 p-3 sm:grid-cols-[repeat(12,calc((100vw-24px-12px*3)/4))] md:grid-cols-[repeat(12,calc((100vw-32px-12px*3)/4))] lg:grid-cols-[repeat(12,calc((100vw-64px-12px*4)/5))] min-[1280px]:grid-cols-[repeat(12,calc((1280px-64px-12px*5)/6))]'>
            {data.products.map((product) => (
              <li key={product.id}>
                <ProductItem
                  product={product}
                  showDiscountPercent
                  showRating
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Banners */}
        <div className='col-span-4 sm:col-span-1'>
          <div className='grid h-full auto-rows-[200px] grid-cols-2 gap-2 py-3 sm:auto-rows-fr sm:grid-cols-1 sm:content-start'>
            {data.banners.map((banner, index) => (
              <div key={index}>
                <Banner
                  image={`/images/banners/${banner.image}`}
                  url={banner.url}
                  alt={banner.alt}
                  fill
                  className='object-contain'
                  sizes='(max-width: 639px) 256px, (max-width: 1023) 20vw, 291px'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
