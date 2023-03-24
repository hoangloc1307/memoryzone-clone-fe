import classNames from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Slider, { Settings } from 'react-slick'
import { productData } from '~/assets/datas/productData'
import { productDetailData } from '~/assets/datas/productDetailData'
import RatingStars from '~/components/RatingStars'
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

  const sliderSettings: Settings = {
    slidesToShow: 5,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    infinite: productDetailData.images.length > 5 ? true : false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          infinite: productDetailData.images.length > 3 ? true : false,
        },
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{productDetailData.name} | MemoryZone</title>
      </Head>

      <div className='c-container'>
        <div className='grid grid-cols-12 gap-5'>
          <div className='col-span-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:col-span-9 lg:grid-cols-12'>
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
                />
              </div>
              {/* Thumbnail */}
              <div className='mt-2'>
                <Slider {...sliderSettings}>
                  {productDetailData.images.map((item, index) => (
                    <div
                      key={index}
                      className='px-1'
                    >
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
                          sizes='75px'
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
              <RatingStars
                rating={product.rating}
                classNameStars='w-6 h-6'
                classNameWrapper='mt-2'
              />
              {/* Brand and status */}
              <div className='mt-2 flex items-center gap-2 text-sm'>
                <p>
                  Thương hiệu: <span className='font-medium text-primary'>{product.brand}</span>
                </p>
                <span>|</span>
                <p>
                  Tình trạng:{' '}
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
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>

          {/* Right sidebar when min-width 1024px */}
          <div className='col-span-3 hidden lg:block'>
            {/* Slogan */}
            <div className='flex flex-col gap-5 divide-y divide-slate-300 rounded-lg border border-primary px-3 py-5'>
              <div className='flex gap-3'>
                <div className='flex-shrink-0 basis-[35px]'>
                  <Image
                    src='/images/icons/shipping.png'
                    alt='Freeship toàn quốc'
                    width={35}
                    height={30}
                    className='h-auto w-full'
                  />
                </div>
                <div className='text-sm text-gray'>
                  <p className='font-semibold uppercase'>Freeship toàn quốc</p>
                  <p>Áp dụng cho đơn hàng từ 300.000đ, đơn hàng dưới 300.000đ +19.000đ phí ship</p>
                </div>
              </div>
              <div className='flex gap-3 pt-5'>
                <div className='flex-shrink-0 basis-[35px]'>
                  <Image
                    src='/images/icons/change.png'
                    alt='Freeship toàn quốc'
                    width={35}
                    height={30}
                    className='h-auto w-full'
                  />
                </div>
                <div className='text-sm text-gray'>
                  <p className='font-semibold uppercase'>Trả góp 0% qua thẻ</p>
                  <p>Ưu đãi không phí chuyển đổi, không chênh lệch so với trả thẳng</p>
                </div>
              </div>
              <div className='flex gap-3 pt-5'>
                <div className='flex-shrink-0 basis-[35px]'>
                  <Image
                    src='/images/icons/pay.png'
                    alt='Freeship toàn quốc'
                    width={35}
                    height={30}
                    className='h-auto w-full'
                  />
                </div>
                <div className='text-sm text-gray'>
                  <p className='font-semibold uppercase'>Thanh toán qua thẻ</p>
                  <p>Miễn phí thanh toán qua Visa, Master, JCB, Union Pay, Amex (không phát sinh phí ẩn)</p>
                </div>
              </div>
            </div>
            {/* You will like */}
            <div></div>
          </div>
        </div>
      </div>
    </>
  )
}
