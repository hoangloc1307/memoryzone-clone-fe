import { Listbox } from '@headlessui/react'
import classNames from 'classnames'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useId } from 'react'
import { filterData } from '~/assets/datas/filterData'
import { productsData } from '~/assets/datas/productData'
import Pagination from '~/components/Pagination'
import PriceRange from '~/components/PriceRange'
import ProductItem from '~/components/ProductItem'
import useQueryConfig from '~/hooks/useQueryConfig'
import { SortType } from '~/types/product.type'
import { qQueryStringToObject } from '~/utils/url'
import { sortByValueToText, sortProductsBy } from '~/utils/utils'

export default function Category() {
  const queryConfig = useQueryConfig()
  const router = useRouter()
  const idCheckbox = useId()
  const { q = '', view, page, limit, sort_by = 'default' } = queryConfig

  const handleChangeViewStyle = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const viewData = (event.target as HTMLElement).dataset.view
    if (viewData !== view) {
      router.push(
        {
          pathname: '/categories/[slug]',
          query: { ...queryConfig, view: viewData, limit: viewData === 'list' ? 4 : 8 },
        },
        undefined,
        {
          scroll: false,
        }
      )
    }
  }

  const handleChangeSortBy = (sortBy: SortType) => {
    if (sortBy !== sort_by) {
      router.push(
        {
          pathname: '/categories/[slug]',
          query: { ...queryConfig, sort_by: sortBy },
        },
        undefined,
        {
          scroll: false,
        }
      )
    }
  }

  const handleFilter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { field, value } = (event.target as HTMLElement).dataset as { field: string; value: string }
    let qText = ''

    if (q) {
      const qObject = qQueryStringToObject(q)
      // Kiểm tra object đã có property [field] chưa, nếu chưa thì thêm mới
      if (qObject.hasOwnProperty(field)) {
        const valuesOfField = qObject[field].split(',')

        // Kiểm tra [value] đã tồn tại trong [field] đó chưa
        // Chưa thì thêm mới, có rồi thì xoá
        if (valuesOfField.includes(value)) {
          const valueIndex = valuesOfField.indexOf(value)
          valuesOfField.splice(valueIndex, 1)
        } else {
          valuesOfField.push(value)
        }

        // Kiểm tra value còn không, nếu không còn thì xoá property luôn
        if (valuesOfField.length > 0) {
          qObject[field] = valuesOfField.join(',')
        } else {
          delete qObject[field]
        }
      } else {
        qObject[field] = value
      }

      // Chuyển object thành string và gán vào qText
      qText = Object.keys(qObject)
        .map((key) => `${key}:${qObject[key]}`)
        .join('_AND_')
    } else {
      qText = `${field}:${value}`
    }

    router.push(
      {
        pathname: '/categories/[slug]',
        query: { ...queryConfig, q: qText },
      },
      undefined,
      {
        scroll: false,
      }
    )
  }

  return (
    <>
      <Head>
        <title>Laptop</title>
      </Head>
      <div className='c-container'>
        <div className='grid grid-cols-12 gap-5'>
          <input type='checkbox' hidden id={idCheckbox} className='peer' />
          <label
            htmlFor={idCheckbox}
            className='group fixed top-1/2 left-0 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-r-full bg-primary pr-1.5 text-white transition-all duration-500 ease-in-out peer-checked:left-[300px] peer-checked:bg-danger lg:hidden'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6 peer-checked:group-first-of-type:hidden'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75'
              />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='hidden h-6 w-6 peer-checked:group-first-of-type:block'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </label>
          {/* Filter */}
          <div className='fixed top-0 left-0 z-10 h-screen w-[300px] -translate-x-full space-y-10 overflow-auto bg-white p-3 pr-10 pt-12 shadow-lg transition-transform duration-500 ease-in-out peer-checked:translate-x-0 lg:static lg:z-0 lg:col-span-3 lg:h-full lg:w-full lg:translate-x-0 lg:p-0 lg:pt-12 lg:shadow-none'>
            <div>
              <p className='text-sm font-semibold uppercase'>Khoảng giá</p>
              <div className='mt-3'>
                <PriceRange />
              </div>
            </div>
            {filterData.map((filter) => (
              <div key={filter.field}>
                <p className='text-sm font-semibold uppercase'>{filter.title}</p>
                <ul className='c-scrollbar mt-3 max-h-[215px] space-y-3 overflow-y-auto'>
                  {filter.items.map((item) => (
                    <li key={item.value}>
                      <div
                        className='group relative flex cursor-pointer items-center gap-1 text-sm lg:hover:text-primary'
                        data-field={filter.field}
                        data-value={item.value}
                        data-checked={qQueryStringToObject(q)[filter.field]?.includes(item.value)}
                        onClick={handleFilter}
                      >
                        <span className='pointer-events-none inline-block h-4 w-4 rounded-full bg-slate-200 transition-[background_.15s_ease-in-out] group-data-[checked=true]:bg-primary lg:group-hover:bg-primary/50' />

                        <span className='pointer-events-none'>{item.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Product list */}
          <div className='col-span-12 lg:col-span-9'>
            <h2 className='text-lg font-bold text-[#444]'>Laptop</h2>
            <div className='mt-5 flex items-center lg:justify-end'>
              {/* View layout */}
              <span
                data-view='list'
                data-view-active={view === 'list'}
                className='inline-block cursor-pointer rounded border border-slate-400 p-1.5 text-slate-400 data-[view-active=true]:border-primary data-[view-active=true]:bg-primary data-[view-active=true]:text-white'
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
                data-view-active={view === 'grid'}
                className='ml-1 inline-block cursor-pointer rounded border border-slate-400 p-1.5 text-slate-400 data-[view-active=true]:border-primary data-[view-active=true]:bg-primary data-[view-active=true]:text-white'
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
                  <Listbox.Button className='group relative h-[34px] w-[180px] rounded border border-slate-400 px-3 py-1.5 text-left leading-4 text-[#444] data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary'>
                    {sortByValueToText(queryConfig.sort_by as SortType)}
                    <span className='absolute top-1/2 right-3 -translate-y-1/2'>
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
                  <Listbox.Options className='absolute top-[34px] left-0 z-10 w-full rounded-b border border-y-0 border-slate-400 bg-white shadow'>
                    {['default', 'name:asc', 'name:desc', 'price:asc', 'price:desc', 'time:asc', 'time:desc'].map(
                      (item, index) => (
                        <Listbox.Option
                          key={index}
                          value={item}
                          className='cursor-pointer border-b border-slate-400 px-3 py-1 hover:text-primary'
                        >
                          {sortByValueToText(item as SortType)}
                        </Listbox.Option>
                      )
                    )}
                  </Listbox.Options>
                </Listbox>
              </div>
            </div>

            {/* Products */}
            <div
              className={classNames('mt-10', {
                'grid grid-cols-2 gap-3 md:grid-cols-4': view === 'grid',
              })}
            >
              {sortProductsBy(productsData, sort_by)
                .slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit))
                .map((product) => (
                  <ProductItem
                    product={product}
                    key={product.id}
                    showRating
                    showDiscountPercent
                    showShortSpecs={view === 'list'}
                    customClass={
                      view === 'list'
                        ? {
                            wrapper: 'mt-5 p-5',
                            imageWrapper: 'mx-auto w-[200px] shrink-0 lg:w-[250px]',
                            name: 'text-base font-semibold min-h-0 md:min-h-0',
                            priceWrapper: 'flex-row justify-start xl:justify-start gap-2 items-end text-base',
                            priceDiscount: 'text-lg md:text-xl',
                            link: 'md:flex md:gap-5 lg:gap-10',
                            stars: 'h-5 w-5',
                            starsWrapper: 'justify-start',
                          }
                        : undefined
                    }
                  />
                ))}
            </div>
            {/* Pagination */}
            <div className='mt-10'>
              <Pagination
                queryConfig={queryConfig}
                range={2}
                totalPage={Math.ceil(productsData.length / Number(limit))}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
