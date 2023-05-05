import Image from 'next/image'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import useViewport from '~/hooks/useViewport'
import { Product2 } from '~/types/product.type'
import { generateSlug } from '~/utils/url'
import { numberAsCurrency } from '~/utils/utils'
import RatingStars from '../RatingStars'
import { TagIcon } from '@heroicons/react/24/solid'

interface Props {
  product: Product2
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
              <TagIcon className='h-12 w-12 rotate-[315deg] text-red-500' />
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
            <del className='text-grey'>
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
              <RatingStars rating={product.rating} size='sm' />
            </div>
          )}
          {/* Short specs */}
          {showShortSpecs && width < 768 && (
            <p className='mt-2 text-sm text-grey line-clamp-3'>{product.shortSpecs.join(' | ')}</p>
          )}
          {showShortSpecs && width >= 768 && (
            <ul className='mt-2 space-y-1 text-sm text-grey'>
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
