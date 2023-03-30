import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import useViewport from '~/hooks/useViewport'
import { Product } from '~/types/product.type'
import { generateSlug } from '~/utils/url'
import { numberAsCurrency } from '~/utils/utils'
import RatingStars from '../RatingStars'

interface Props {
  product: Product
  showRating?: boolean
  showDiscountPercent?: boolean
  showShortSpecs?: boolean
  customClass?: {
    wrapper?: string
    link?: string
    name?: string
    imageWrapper?: string
    priceWrapper?: string
    priceDiscount?: string
    starsWrapper?: string
    stars?: string
  }
}

export default function ProductItem({ product, showRating, showDiscountPercent, showShortSpecs, customClass }: Props) {
  const width = useViewport()

  return (
    <div className={twMerge('rounded border border-transparent p-2 shadow hover:border-primary', customClass?.wrapper)}>
      <Link href={`/products/${generateSlug(product.name, product.id)}`} className={customClass?.link}>
        {/* Image */}
        <div className={twMerge('relative aspect-square min-w-[75px]', customClass?.imageWrapper)}>
          <Image
            src={`/images/products/${product.thumbnail}`}
            alt={product.name}
            fill
            sizes='(max-width: 639px) 33vw, (max-width: 1023px) 25vw, (max-width: 1279px) 20vw, 17vw'
            className='object-contain'
          />
          {/* Discount percent */}
          {showDiscountPercent && (
            <div className='absolute -top-3 left-0 h-12 w-14'>
              <span className='text-red-500'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-12 w-12 rotate-[315deg]'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z'
                    clipRule='evenodd'
                  />
                </svg>
              </span>
              <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold leading-none text-white'>
                {`-${Math.round(((product.price - product.priceDiscount) / product.price) * 100)}%`}
              </span>
            </div>
          )}
        </div>
        {/* Name and price */}
        <div className='grow text-xs md:text-sm'>
          {/* Name */}
          <h3 className={twMerge('mt-2 min-h-[48px] line-clamp-3 md:min-h-[60px]', customClass?.name)}>
            {product.name}
          </h3>
          {/* Price */}
          <p
            className={twMerge(
              'mt-2 flex flex-col items-center xl:flex-row xl:items-end xl:justify-center xl:gap-2',
              customClass?.priceWrapper
            )}
          >
            <del className='text-gray'>
              {numberAsCurrency(product.price)}
              <sup>đ</sup>
            </del>
            <span className={twMerge('text-sm font-semibold text-primary md:text-base', customClass?.priceDiscount)}>
              {numberAsCurrency(product.priceDiscount)}
              <sup>đ</sup>
            </span>
          </p>
          {/* Rating start */}
          {showRating && (
            <div className={twMerge('mt-2 flex justify-center', customClass?.starsWrapper)}>
              <RatingStars rating={product.rating} classNameStars={customClass?.stars} />
            </div>
          )}
          {/* Short specs */}
          {showShortSpecs && width < 768 && (
            <p className='mt-2 text-sm text-gray line-clamp-3'>{product.shortSpecs.join(' | ')}</p>
          )}
          {showShortSpecs && width >= 768 && (
            <ul className='mt-2 space-y-1 text-sm text-gray'>
              {product.shortSpecs.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    </div>
  )
}
