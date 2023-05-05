import { StarIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'

interface Props {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  starsColor?: string
}

export default function RatingStars({ rating, starsColor, size = 'md' }: Props) {
  const wholeNumberPart = Math.floor(rating)
  const decimalPart = rating - wholeNumberPart
  const grayStars = 5 - Math.ceil(rating)

  return (
    <div className='inline-flex'>
      {/* Yellow stars */}
      {Array(wholeNumberPart)
        .fill(0)
        .map((_, index) => (
          <div key={index} className={twMerge('text-[#ffc107]', starsColor)}>
            <StarIcon
              className={classNames({
                'h-4 w-4': size === 'sm',
                'h-5 w-5': size === 'md',
                'h-6 w-6': size === 'lg',
              })}
              fill='currentColor'
            />
          </div>
        ))}

      {/* Semi stars */}
      {decimalPart > 0 && (
        <div className='relative'>
          <StarIcon
            className={classNames({
              'h-4 w-4': size === 'sm',
              'h-5 w-5': size === 'md',
              'h-6 w-6': size === 'lg',
            })}
            fill='#888888'
          />
          <span
            className={classNames(
              'absolute top-0 left-0 bottom-0 overflow-hidden',
              twMerge('text-[#ffc107]', starsColor)
            )}
            style={{ width: `${Math.round(decimalPart * 100)}%` }}
          >
            <StarIcon
              className={classNames({
                'h-4 w-4': size === 'sm',
                'h-5 w-5': size === 'md',
                'h-6 w-6': size === 'lg',
              })}
              fill='currentColor'
            />
          </span>
        </div>
      )}

      {/* Gray stars */}
      {grayStars > 0 &&
        Array(grayStars)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <StarIcon
                className={classNames({
                  'h-4 w-4': size === 'sm',
                  'h-5 w-5': size === 'md',
                  'h-6 w-6': size === 'lg',
                })}
                fill='#888888'
              />
            </div>
          ))}
    </div>
  )
}
