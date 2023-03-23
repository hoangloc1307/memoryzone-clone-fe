import classNames from 'classnames'
import DOMPurify from 'isomorphic-dompurify'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
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
    slidesToShow: 3,
    arrows: false,
    swipeToSlide: true,
    centerMode: true,
    infinite: true,
    focusOnSelect: true,
  }

  return (
    <div className='c-container'>
      <div className='grid grid-cols-1 gap-5'>
        {/* Image */}
        <div>
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
                    className={classNames('relative aspect-square rounded border border-dashed', {
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
        <div>
          {/* Name */}
          <h1 className='text-2xl font-medium text-dark'>{product.name}</h1>
          {/* Stars */}
          <RatingStars
            rating={product.rating}
            classNameStars='w-6 h-6'
            classNameWrapper='mt-2 text-center'
          />
          {/* Brand and status */}
          <div className='mt-2 flex items-center justify-center gap-2 text-sm'>
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
          <div className='mt-2 flex items-end justify-center gap-5'>
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
          <div className='mt-5 grid gap-2'>
            <div className='grid-cols-1'>
              <button className='w-full rounded bg-primary py-2 text-white'>
                <p className='text-sm font-medium uppercase'>Mua ngay</p>
                <p className='text-xs'>Giao hàng miễn phí tận nơi</p>
              </button>
            </div>
            <div className='grid-cols-1'>
              <button className='w-full rounded bg-danger py-2 text-white'>
                <p className='text-sm font-medium uppercase'>Trả góp</p>
                <p className='text-xs'>Duyệt nhanh qua điện thoại</p>
              </button>
            </div>
            <div className='grid-cols-1'>
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
        <div>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>
    </div>
  )
}
