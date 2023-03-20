import Image from 'next/image'
import { Product } from '~/types/product.type'
import { formatNumberAsCurrency } from '~/utils/utils'
import RatingStars from '../RatingStars'

interface Props {
  product: Product
  showRating?: boolean
  showDiscountPercent?: boolean
}

export default function ProductItem({ product, showRating, showDiscountPercent }: Props) {
  return (
    <div className='relative rounded p-2 shadow'>
      <a href={product.url}>
        {/* Image */}
        <div className='relative aspect-square'>
          <Image
            src={`/images/products/${product.image}`}
            alt={product.name}
            fill
            sizes='(max-width: 639px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 20vw, 17vw'
            className='object-cover'
          />
        </div>
        {/* Name and price */}
        <div className='text-xs md:text-sm'>
          <h3 className='my-2 min-h-[48px] line-clamp-3 md:min-h-[60px]'>{product.name}</h3>
          <p className='flex flex-col items-center lg:flex-row lg:items-end lg:justify-center lg:gap-2'>
            <span className='text-sm font-semibold text-primary md:text-base'>
              {formatNumberAsCurrency(product.newPrice)}
              <sup>đ</sup>
            </span>
            <span className='text-gray line-through'>
              {formatNumberAsCurrency(product.price)}
              <sup>đ</sup>
            </span>
          </p>
        </div>
      </a>
      {/* Rating start */}
      {showRating && (
        <div className='mt-2 flex justify-center'>
          <RatingStars rating={product.rating} />
        </div>
      )}
      {/* Discount percent */}
      {showDiscountPercent && (
        <div className='absolute -top-2 -right-1 h-10 w-11 sm:-right-2 sm:h-12 sm:w-14'>
          <span className='text-red-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='h-10 w-10 rotate-[315deg] sm:h-12 sm:w-12'
            >
              <path
                fillRule='evenodd'
                d='M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z'
                clipRule='evenodd'
              />
            </svg>
          </span>
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold leading-none text-white sm:text-xs'>
            {`-${Math.round(((product.price - product.newPrice) / product.price) * 100)}%`}
          </span>
        </div>
      )}
    </div>
  )
}
