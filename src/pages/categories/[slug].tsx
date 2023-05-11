import { Listbox } from '@headlessui/react'
import { BarsArrowDownIcon, ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { AdjustmentsHorizontalIcon, Squares2X2Icon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useId } from 'react'
import Pagination from '~/components/Pagination'
import PriceRange from '~/components/PriceRange'
import ProductItem from '~/components/ProductItem'
import { filterData } from '~/datas/filterData'
import { productsData } from '~/datas/productData'
import useQueryConfig from '~/hooks/useQueryConfig'
import { SortType } from '~/types/product.type'
import { qQueryStringToObject } from '~/utils/url'
import { sortByValueToText, sortProductsBy } from '~/utils/utils'

const MIN_RANGE = 0,
  MAX_RANGE = 100_000_000

export const getServerSideProps: GetServerSideProps<{ data: {} }> = async () => {
  return { props: { data: {} } }
}

export default function CategoryPage() {
  const queryConfig = useQueryConfig()
  const router = useRouter()
  const idCheckbox = useId()
  const { q, view = 'grid', page = '1', limit = '8', sort_by = 'default', price_min, price_max } = queryConfig

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

  const handleSubmitPriceRange = (min: number, max: number) => {
    router.push(
      {
        pathname: '/categories/[slug]',
        query: { ...queryConfig, price_min: min, price_max: max },
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
            className='group fixed top-1/2 left-0 z-10 flex h-10 w-[340px] -translate-x-[300px] -translate-y-1/2 items-center justify-center rounded-r-full bg-primary pl-[300px] pr-1.5 text-white transition-all duration-500 ease-in-out peer-checked:translate-x-0 peer-checked:bg-danger lg:hidden'
          >
            <AdjustmentsHorizontalIcon className='h-6 w-6 peer-checked:group-first-of-type:hidden' />
            <XMarkIcon className='hidden h-6 w-6 peer-checked:group-first-of-type:block' />
          </label>
          {/* Filter */}
          <div className='fixed top-0 left-0 z-10 h-screen w-[300px] -translate-x-full space-y-10 overflow-auto bg-white p-3 pr-10 pt-12 shadow-lg transition-transform duration-500 ease-in-out peer-checked:translate-x-0 lg:static lg:z-0 lg:col-span-3 lg:h-full lg:w-full lg:translate-x-0 lg:p-0 lg:pt-12 lg:shadow-none'>
            <div>
              <p className='text-sm font-semibold uppercase'>Khoảng giá</p>
              <div className='mt-3'>
                <PriceRange
                  minRange={MIN_RANGE}
                  maxRange={MAX_RANGE}
                  minValue={price_min}
                  maxValue={price_max}
                  gap={((MAX_RANGE - MIN_RANGE) / 100) * 5}
                  onSubmit={handleSubmitPriceRange}
                />
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
                        data-checked={qQueryStringToObject(q as string)[filter.field]?.includes(item.value)}
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
                <ListBulletIcon className='pointer-events-none h-5 w-5' />
              </span>
              <span
                data-view='grid'
                data-view-active={view === 'grid'}
                className='ml-1 inline-block cursor-pointer rounded border border-slate-400 p-1.5 text-slate-400 data-[view-active=true]:border-primary data-[view-active=true]:bg-primary data-[view-active=true]:text-white'
                onClick={handleChangeViewStyle}
              >
                <Squares2X2Icon className='pointer-events-none h-5 w-5' />
              </span>

              {/* Sort by */}
              <div className='relative ml-5 text-sm'>
                <Listbox value={sort_by} onChange={handleChangeSortBy}>
                  <Listbox.Button className='group relative h-[34px] w-[180px] rounded border border-slate-400 px-3 py-1.5 text-left leading-4 text-[#444] data-[headlessui-state=open]:rounded-b-none data-[headlessui-state=open]:border-primary'>
                    {sortByValueToText(sort_by as SortType)}
                    <span className='absolute top-1/2 right-3 -translate-y-1/2'>
                      <BarsArrowDownIcon className='h-5 w-5' />
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
              {sortProductsBy(productsData, sort_by as SortType)
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
                queryString={queryConfig}
                currentPage={Number(page)}
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
