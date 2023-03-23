interface Props {
  rating: number
  showNumber?: boolean
  starsColor?: string
  classNameStars?: string
  classNameWrapper?: string
}

export default function RatingStars({
  rating,
  showNumber = false,
  starsColor = '#ffc107',
  classNameStars = 'w-4 h-4',
  classNameWrapper = 'flex flex-col items-center gap-0 md:flex-row',
}: Props) {
  const wholeNumberPart = Math.floor(rating)
  const decimalPart = rating - wholeNumberPart
  const grayStars = 5 - Math.ceil(rating)

  return (
    <div className={classNameWrapper}>
      {/* Stars */}
      <div className='inline-flex'>
        {/* Yellow stars */}
        {Array(wholeNumberPart)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill={starsColor}
                className={classNameStars}
              >
                <path
                  fillRule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          ))}

        {/* Semi stars */}
        {decimalPart > 0 && (
          <div className='relative'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='#888888'
              className={classNameStars}
            >
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                clipRule='evenodd'
              />
            </svg>
            <span
              className='absolute top-0 left-0 bottom-0 overflow-hidden'
              style={{ width: `${Math.round(decimalPart * 100)}%` }}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill={starsColor}
                className={classNameStars}
              >
                <path
                  fillRule='evenodd'
                  d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
          </div>
        )}

        {/* Gray stars */}
        {grayStars > 0 &&
          Array(grayStars)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='#888888'
                  className={classNameStars}
                >
                  <path
                    fillRule='evenodd'
                    d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            ))}
      </div>

      {/* Number */}
      {showNumber && <p className='text-xs font-medium text-gray'>({rating}/5)</p>}
    </div>
  )
}
