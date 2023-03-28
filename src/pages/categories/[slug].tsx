import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { productData } from '~/assets/datas/productData'
import ProductItem from '~/components/ProductItem'
import useQueryConfig from '~/hooks/useQueryConfig'
import { SortType } from '~/types/product.type'
import { sortByValueToText } from '~/utils/utils'

type ViewLayout = 'list' | 'grid'

export default function Category() {
  const [viewLayout, setViewLayout] = useState<ViewLayout>('grid')
  const queryConfig = useQueryConfig()
  const router = useRouter()

  const handleChangeViewStyle = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const view = (event.target as HTMLElement).dataset.view
    setViewLayout(view as ViewLayout)
  }

  const handleChangeSortBy = (sortBy: SortType) => {
    router.push({
      pathname: '/categories/[slug]',
      query: { ...queryConfig, sort_by: sortBy, slug: router.query.slug },
    })
  }

  return (
    <div className='c-container'>
      <div className='grid grid-cols-12'>
        {/* Filter */}
        <div className='hidden lg:col-span-3 lg:block'>Filter</div>
        {/* Product list */}
        <div className='col-span-12 lg:col-span-9'>
          <h2 className='text-lg font-bold text-[#444]'>Laptop</h2>
          <div className='mt-5 flex items-center'>
            {/* View layout */}
            <span
              data-view='list'
              data-view-active={viewLayout === 'list'}
              className='inline-block cursor-pointer rounded border border-slate-300 p-1.5 text-slate-300 data-[view-active=true]:border-primary data-[view-active=true]:bg-primary data-[view-active=true]:text-white'
              onClick={handleChangeViewStyle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='pointer-events-none h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z'
                  clipRule='evenodd'
                />
              </svg>
            </span>
            <span
              data-view='grid'
              data-view-active={viewLayout === 'grid'}
              className='ml-1 inline-block cursor-pointer rounded border border-slate-300 p-1.5 text-slate-300 data-[view-active=true]:border-primary data-[view-active=true]:bg-primary data-[view-active=true]:text-white'
              onClick={handleChangeViewStyle}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='pointer-events-none h-5 w-5'
              >
                <path
                  fillRule='evenodd'
                  d='M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z'
                  clipRule='evenodd'
                />
              </svg>
            </span>

            {/* Sort by */}
            <div className='relative ml-5 text-sm'>
              <Listbox value={queryConfig.sort_by} onChange={handleChangeSortBy}>
                <Listbox.Button className='group relative h-[34px] w-[180px] rounded border border-slate-300 px-3 py-1.5 text-left leading-4 text-[#444] data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary'>
                  {sortByValueToText(queryConfig.sort_by as SortType)}
                  <span className='absolute top-1/2 right-3 -translate-y-1/2 transition-transform duration-500 ease-in-out group-data-[headlessui-state=open]:rotate-180'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-5 w-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25'
                      />
                    </svg>
                  </span>
                </Listbox.Button>
                <Listbox.Options className='absolute top-[34px] left-0 z-10 w-full rounded-b border border-t-0 border-slate-300 bg-white shadow'>
                  {['default', 'name:asc', 'name:desc', 'price:asc', 'price:desc', 'time:asc', 'time:desc'].map(
                    (item, index) => (
                      <Listbox.Option
                        key={index}
                        value={item}
                        className='cursor-pointer border-b border-slate-300 px-3 py-1 hover:text-primary'
                      >
                        {sortByValueToText(item as SortType)}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </Listbox>
            </div>
          </div>
          <div
            className={classNames('mt-10', {
              'grid grid-cols-2 gap-3 md:grid-cols-4': viewLayout === 'grid',
            })}
          >
            {productData.slice(0, 24).map((product) => (
              <ProductItem product={product} key={product.id} showRating showDiscountPercent />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
