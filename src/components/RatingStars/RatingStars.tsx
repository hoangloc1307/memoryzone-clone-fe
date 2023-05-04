import { StarIcon } from '@heroicons/react/24/solid'
import { twMerge } from 'tailwind-merge'

interface Props {
  rating: number
  starsColor?: string
  classNameStars?: string
  classNameWrapper?: string
}

export default function RatingStars({ rating, starsColor, classNameStars, classNameWrapper }: Props) {
  const wholeNumberPart = Math.floor(rating)
  const decimalPart = rating - wholeNumberPart
  const grayStars = 5 - Math.ceil(rating)

  return (
    <div title={`${rating} /  5`} className={twMerge('flex flex-col items-center gap-0 md:flex-row', classNameWrapper)}>
      {/* Stars */}
      <div className='inline-flex'>
        {/* Yellow stars */}
        {Array(wholeNumberPart)
          .fill(0)
          .map((_, index) => (
            <div key={index} className={twMerge('text-[#ffc107]', starsColor)}>
              <StarIcon className={twMerge('h-4 w-4', classNameStars)} fill='currentColor' />
            </div>
          ))}

        {/* Semi stars */}
        {decimalPart > 0 && (
          <div className='relative'>
            <StarIcon className={twMerge('h-4 w-4', classNameStars)} fill='#888888' />
            <span
              className={twMerge('absolute top-0 left-0 bottom-0 overflow-hidden text-[#ffc107]', starsColor)}
              style={{ width: `${Math.round(decimalPart * 100)}%` }}
            >
              <StarIcon className={twMerge('h-4 w-4', classNameStars)} fill='currentColor' />
            </span>
          </div>
        )}

        {/* Gray stars */}
        {grayStars > 0 &&
          Array(grayStars)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <StarIcon className={twMerge('h-4 w-4', classNameStars)} fill='#888888' />
              </div>
            ))}
      </div>
    </div>
  )
}
