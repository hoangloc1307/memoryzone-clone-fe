import classNames from 'classnames'
import Link from 'next/link'
import { ProductListConfig } from '~/types/product.type'

interface Props {
  queryConfig: ProductListConfig
  totalPage: number
}

const RANGE = 1

export default function Pagination({ queryConfig, totalPage }: Props) {
  const currentPage = Number(queryConfig.page)

  const renderPagination = () => {
    let isRenderDotBefore = false
    let isRenderDotAfter = false

    const renderDotBefore = (index: number) => {
      if (!isRenderDotBefore) {
        isRenderDotBefore = true
        return (
          <span key={index} className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'>
            ...
          </span>
        )
      }
      return null
    }

    const renderDotAfter = (index: number) => {
      if (!isRenderDotAfter) {
        isRenderDotAfter = true
        return (
          <span key={index} className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'>
            ...
          </span>
        )
      }
      return null
    }

    return (
      <>
        {Array(totalPage)
          .fill(0)
          .map((_, index) => {
            const pageNumber = index + 1

            if (
              currentPage <= RANGE * 2 + 1 &&
              pageNumber > currentPage + RANGE &&
              pageNumber < totalPage - RANGE + 1
            ) {
              return renderDotAfter(index)
            } else if (currentPage > RANGE * 2 + 1 && currentPage < totalPage - RANGE * 2) {
              if (pageNumber > currentPage + RANGE && pageNumber < totalPage - RANGE + 1) {
                return renderDotAfter(index)
              } else if (pageNumber > RANGE && pageNumber < currentPage - RANGE) {
                return renderDotBefore(index)
              }
            } else if (currentPage >= totalPage - RANGE * 2 && pageNumber > RANGE && pageNumber < currentPage - RANGE) {
              return renderDotBefore(index)
            }

            return (
              <Link
                key={index}
                href={{
                  pathname: '/categories/[slug]',
                  query: { ...queryConfig, page: pageNumber },
                }}
                className={classNames('w-8 rounded p-1.5 text-center text-sm', {
                  'bg-primary text-white': pageNumber === currentPage,
                  'bg-[#f2f2f2]': pageNumber !== currentPage,
                })}
              >
                {pageNumber}
              </Link>
            )
          })}
      </>
    )
  }

  return (
    <div className='flex justify-center gap-2'>
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={{
            pathname: '/categories/[slug]',
            query: { ...queryConfig, page: currentPage - 1 },
          }}
          className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </Link>
      ) : (
        <span className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
        </span>
      )}
      {/* Number */}
      {renderPagination()}
      {/* Next */}
      {currentPage < totalPage ? (
        <Link
          href={{
            pathname: '/categories/[slug]',
            query: { ...queryConfig, page: currentPage + 1 },
          }}
          className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      ) : (
        <span className='w-8 rounded bg-[#f2f2f2] p-1.5 text-center text-sm'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </span>
      )}
    </div>
  )
}
