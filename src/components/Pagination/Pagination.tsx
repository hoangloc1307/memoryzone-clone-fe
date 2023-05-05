import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import Link from 'next/link'

interface Props {
  currentPage: number
  totalPage: number
  range?: number
  queryString?: {}
}

export default function Pagination({ currentPage = 1, totalPage, range = 1, queryString }: Props) {
  const renderPagination = () => {
    let isRenderDotBefore = false
    let isRenderDotAfter = false

    const renderDotBefore = (index: number) => {
      if (!isRenderDotBefore) {
        isRenderDotBefore = true
        return (
          <span
            key={index}
            className='select-none border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500'
          >
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
          <span
            key={index}
            className='select-none border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500'
          >
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
              currentPage <= range * 2 + 1 &&
              pageNumber > currentPage + range &&
              pageNumber < totalPage - range + 1
            ) {
              return renderDotAfter(index)
            } else if (currentPage > range * 2 + 1 && currentPage < totalPage - range * 2) {
              if (pageNumber > currentPage + range && pageNumber < totalPage - range + 1) {
                return renderDotAfter(index)
              } else if (pageNumber > range && pageNumber < currentPage - range) {
                return renderDotBefore(index)
              }
            } else if (currentPage >= totalPage - range * 2 && pageNumber > range && pageNumber < currentPage - range) {
              return renderDotBefore(index)
            }

            return (
              <Link
                key={index}
                href={{
                  query: { ...queryString, page: pageNumber },
                }}
                className={classNames('border border-gray-300 px-3 py-2 leading-tight', {
                  'bg-primary text-white': pageNumber === currentPage,
                  'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700': pageNumber !== currentPage,
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
    <div className='flex justify-center -space-x-px'>
      {/* Prev */}
      {currentPage > 1 ? (
        <Link
          href={{
            query: { ...queryString, page: currentPage - 1 },
          }}
          className='ml-0 block select-none rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
        >
          <ChevronLeftIcon className='h-5 w-5' />
        </Link>
      ) : (
        <span className='ml-0 block select-none rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
          <ChevronLeftIcon className='h-5 w-5' />
        </span>
      )}
      {/* Number */}
      {renderPagination()}
      {/* Next */}
      {currentPage < totalPage ? (
        <Link
          href={{
            query: { ...queryString, page: currentPage + 1 },
          }}
          className='block select-none rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '
        >
          <ChevronRightIcon className='h-5 w-5' />
        </Link>
      ) : (
        <span className='block select-none rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 '>
          <ChevronRightIcon className='h-5 w-5' />
        </span>
      )}
    </div>
  )
}
