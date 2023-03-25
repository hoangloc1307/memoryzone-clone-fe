import classNames from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import map from 'lodash/map'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { productData } from '~/assets/datas/productData'
import { productDetailData } from '~/assets/datas/productData'
import { productDetailSlogan } from '~/assets/datas/sloganData'
import RatingStars from '~/components/RatingStars'
import ProductItem from '~/components/ProductItem'
import { Product } from '~/types/product.type'
import { generateSlug, numberAsCurrency, statusTextFromQuantity } from '~/utils/utils'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = productData.map((product) => ({ params: { slug: generateSlug(product.name, product.id) } }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ product: Product }> = async ({ params }) => {
  return {
    props: {
      product: productDetailData,
    },
  }
}

export default function ProductDetail({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const title = `${productDetailData.name} | MemoryZone`

  const sliderSettings: Settings = {
    slidesToShow: 3,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    infinite: productDetailData.images.length > 5 ? true : false,
    focusOnSelect: true,
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div className='c-container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 grid auto-rows-max grid-cols-1 gap-5 self-start md:auto-rows-fr md:grid-cols-2 lg:col-span-9 lg:grid-cols-12'>
            {/* Image */}
            <div className='lg:col-span-5'>
              {/* Large image */}
              <div className='relative aspect-square rounded shadow'>
                <Image
                  src={`/images/product_detail/${product.images[currentIndex]}`}
                  alt=''
                  fill
                  priority
                  className='object-contain p-2'
                  sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 370px'
                />
              </div>
              {/* Thumbnail */}
              <div className='mt-2'>
                <Slider {...sliderSettings}>
                  {productDetailData.images.map((item, index) => (
                    <div key={index} className='px-1'>
                      <div
                        className={classNames('relative aspect-square cursor-pointer rounded border-2 border-dashed', {
                          'border-primary': currentIndex === index,
                          'border-slate-200': currentIndex !== index,
                        })}
                        onClick={() => setCurrentIndex(index)}
                      >
                        <Image
                          src={`/images/product_detail/${item}`}
                          alt={product.name}
                          fill
                          className='object-contain p-1'
                          sizes='(max-width: 767px) 200px, (max-width: 1023px) 120px, 55px'
                        />
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>

            {/* Name and price */}
            <div className='md:row-span-2 lg:col-span-7'>
              {/* Name */}
              <h1 className='text-2xl font-medium text-dark'>{product.name}</h1>
              {/* Stars */}
              <RatingStars rating={product.rating} classNameStars='w-6 h-6' classNameWrapper='mt-2' />
              {/* Brand and status */}
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <p>
                  Thương hiệu: <span className='font-medium text-primary'>{product.brand}</span>
                </p>
                <span>|</span>
                <p>
                  Tình trạng:
                  <span
                    className={classNames('font-medium', {
                      'text-blue-500': product.quantity === -1,
                      'text-danger': product.quantity === 0,
                      'text-warn': product.quantity <= 5,
                      'text-primary': product.quantity > 5,
                    })}
                  >
                    {statusTextFromQuantity(product.quantity)}
                  </span>
                </p>
              </div>
              {/* Price */}
              <div className='mt-2 flex items-end gap-5'>
                <p className='text-2xl font-medium text-primary'>
                  {numberAsCurrency(product.priceDiscount)}
                  <sup>đ</sup>
                </p>
                <del className='text-gray'>
                  {numberAsCurrency(product.price)}
                  <sup>đ</sup>
                </del>
              </div>
              {/* Promotions */}
              <div className='mt-5 rounded border border-dashed border-primary p-3'>
                <div className='text-sm'>
                  <p className='flex items-center gap-2'>
                    <span className='text-red-500'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        className='h-6 w-6'
                      >
                        <path d='M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z' />
                      </svg>
                    </span>
                    <span className='font-bold uppercase text-red-500'>Back to school - Hành trang cool</span>
                  </p>
                  <ul className='mt-3 list-disc space-y-2 pl-10'>
                    <li>
                      <p className='font-bold uppercase'>
                        Ram to không lo giật lag{' '}
                        <a href='#' className='normal-case text-link'>
                          (Click here)
                        </a>
                      </p>
                    </li>
                    <li>
                      <p className='font-bold text-warn'>
                        Tặng bộ Microsoft Office 365 + 1TB Onedrive bản quyền{' '}
                        <a href='#' className='normal-case text-link'>
                          (Click here)
                        </a>
                      </p>
                    </li>
                  </ul>
                  <div className='relative my-2 aspect-[6/1]'>
                    <Image
                      src={'/images/banners/ramto.jpg'}
                      alt='Ram to'
                      fill
                      priority
                      sizes='(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 500px'
                    />
                  </div>
                  <div>
                    <p className='flex items-center gap-2'>
                      <span className='text-red-500'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='currentColor'
                          className='h-6 w-6'
                        >
                          <path d='M9.375 3a1.875 1.875 0 000 3.75h1.875v4.5H3.375A1.875 1.875 0 011.5 9.375v-.75c0-1.036.84-1.875 1.875-1.875h3.193A3.375 3.375 0 0112 2.753a3.375 3.375 0 015.432 3.997h3.943c1.035 0 1.875.84 1.875 1.875v.75c0 1.036-.84 1.875-1.875 1.875H12.75v-4.5h1.875a1.875 1.875 0 10-1.875-1.875V6.75h-1.5V4.875C11.25 3.839 10.41 3 9.375 3zM11.25 12.75H3v6.75a2.25 2.25 0 002.25 2.25h6v-9zM12.75 12.75v9h6.75a2.25 2.25 0 002.25-2.25v-6.75h-9z' />
                        </svg>
                      </span>
                      <span className='font-bold'>Khuyến mãi:</span>
                    </p>
                    <ul className='mt-3 list-disc space-y-2 pl-10'>
                      <li>
                        <p className='font-bold text-warn'>Túi chống sốc</p>
                      </li>
                      <li>
                        <p>
                          <span className='text-primary'>Miễn phí</span> vệ sinh trong thời gian bảo hành
                        </p>
                      </li>
                      <li>
                        <p>
                          <span className='text-primary'>Miễn phí</span> vận chuyển toàn quốc
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Buttons */}
              <div className='mt-5 grid gap-2 lg:grid-cols-2'>
                <div>
                  <button className='w-full rounded bg-primary py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Mua ngay</p>
                    <p className='text-xs'>Giao hàng miễn phí tận nơi</p>
                  </button>
                </div>
                <div>
                  <button className='w-full rounded bg-danger py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Trả góp</p>
                    <p className='text-xs'>Duyệt nhanh qua điện thoại</p>
                  </button>
                </div>
                <div className='lg:col-span-2'>
                  <button className='w-full rounded bg-warn py-2 text-white'>
                    <p className='text-sm font-medium uppercase'>Trả góp 0% qua thẻ Visa, Master, JCB</p>
                    <p className='text-xs'>
                      Áp dụng cho đơn hàng từ 3.000.000<sup>đ</sup>
                    </p>
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='lg:col-span-5'>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }} />
            </div>
          </div>

          {/* Right sidebar when min-width 1024px */}
          <div className='col-span-3 hidden lg:block'>
            {/* Slogan */}
            <div className='flex flex-col gap-5 divide-y divide-slate-300 rounded-lg border border-primary px-3 py-5'>
              {productDetailSlogan.map((item, index) => (
                <div
                  className={classNames('flex gap-3', {
                    'pt-5': index !== 0,
                  })}
                  key={index}
                >
                  <div className='w-[35px] flex-shrink-0'>
                    <Image
                      src={`/images/icons/${item.icon}`}
                      alt={item.title}
                      width={35}
                      height={30}
                      className='h-auto'
                    />
                  </div>
                  <div className='text-sm text-gray'>
                    <p className='font-bold uppercase'>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* You will like */}
            <div className='mt-10'>
              <h3 className='rounded bg-primary py-2 px-5 text-lg font-bold uppercase text-white'>Có thể bạn thích</h3>
              <ul>
                {productData
                  .filter((product) => map(product.categories, 'name').includes('Laptop'))
                  .slice(0, 5)
                  .map((product) => (
                    <li key={product.id}>
                      <ProductItem product={product} classNameLink='flex gap-2' classNameWrapper='my-1' />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
