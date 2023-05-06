import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Pagination from '~/components/Pagination'
import RatingStars from '~/components/RatingStars'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { ProductWithPagination } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'
import { numberAsCurrency } from '~/utils/utils'

const LIMIT = 5

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return { props: {} }
}

const AdminProductsPage = () => {
  const http = useAuthAxios()
  const router = useRouter()
  const query = router.query
  const queryString = omitBy(
    {
      page: query.page ?? '1',
      name: query.name,
    },
    isNil
  )
  const [keyword, setKeyword] = useState('')
  const debounceCallApi = useRef(
    debounce((keyword: string) => {
      if (keyword) {
        router.push({
          query: { page: 1, name: keyword },
        })
      } else {
        router.push({
          query: { page: 1 },
        })
      }
    }, 800)
  ).current

  // Get products
  const productsQuery = useQuery({
    queryKey: ['products', queryString],
    queryFn: () =>
      http.get<SuccessResponse<ProductWithPagination>>('/products', {
        params: { ...queryString, limit: LIMIT },
      }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, //5min
  })
  const products = productsQuery.data?.data.data.products
  const pagination = productsQuery.data?.data.data.pagination

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setKeyword(value)
    debounceCallApi(value)
  }

  return (
    <>
      {/* Search */}
      <div>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <MagnifyingGlassIcon className='h-5 w-5 text-gray-500' />
          </div>
          <input
            type='text'
            className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary'
            placeholder='Tìm sản phẩm'
            value={keyword}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='mt-5 w-[1000px] min-w-full text-left text-sm text-gray-500 lg:w-[980px]'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th className='w-80 px-4 py-3'>Sản phẩm</th>
              <th className='w-32 px-4 py-3'>Loại</th>
              <th className='w-24 px-4 py-3'>Tồn kho</th>
              <th className='w-28 px-4 py-3'>Giá</th>
              <th className='px-4 py-3'>Danh mục</th>
              <th className='w-24 px-4 py-3'>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((product) => (
                <tr key={product.id} className='border-b hover:bg-gray-100'>
                  <th className='flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-900'>
                    <Image
                      src={product.image || 'https://i.imgur.com/I3fognq.png'}
                      alt={product.name}
                      width={50}
                      height={50}
                      className='mx-auto block rounded-md'
                    />
                    <span className='line-clamp-3'>{product.name}</span>
                  </th>
                  <td className='px-4 py-2'>
                    <span className='rounded bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary empty:hidden'>
                      {product.type}
                    </span>
                  </td>
                  <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                    <div className='flex items-center'>
                      <span
                        className={classNames('mr-2 inline-block h-4 w-4 rounded-full', {
                          'bg-red-700': product.quantity <= 5,
                          'bg-orange-500': 5 < product.quantity && product.quantity <= 10,
                          'bg-yellow-300': 10 < product.quantity && product.quantity <= 20,
                          'bg-green-400': product.quantity > 20,
                        })}
                      />
                      <span>{product.quantity}</span>
                    </div>
                  </td>
                  <td className='px-4 py-2 font-medium'>
                    <div className='text-primary'>
                      {numberAsCurrency(product.priceDiscount)}
                      <sup>đ</sup>
                    </div>
                    <div className='text-danger line-through'>
                      {numberAsCurrency(product.price)}
                      <sup>đ</sup>
                    </div>
                  </td>
                  <td className='px-4 py-2'>
                    <div className='flex flex-wrap gap-1'>
                      {product.categories.map((category, index) => (
                        <span key={index} className='rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700'>
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className='px-4 py-2 text-center'>
                    <Link
                      href={`${path.admin.products}/${product.id}`}
                      className='inline-block p-2 hover:text-blue-400'
                    >
                      <PencilSquareIcon className='h-5 w-5' />
                    </Link>
                  </td>
                </tr>
              ))}

            {/* No products */}
            {products && products.length == 0 && (
              <tr>
                <td colSpan={4} className='border border-slate-300 px-2 py-1 text-center italic text-danger'>
                  Không tìm thấy sản phẩm nào
                </td>
              </tr>
            )}

            {/* Loading skeleton */}
            {!products &&
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <tr key={index} className='border-b'>
                    <td className='flex items-center gap-2 px-4 py-2'>
                      <div className='h-[50px] w-[50px] flex-shrink-0 bg-gray-300' />
                      <div className='flex-grow'>
                        <span className='inline-block h-2.5 w-full rounded bg-gray-300' />
                        <span className='inline-block h-2.5 w-full rounded bg-gray-300' />
                        <span className='inline-block h-2.5 w-1/2 rounded bg-gray-300' />
                      </div>
                    </td>
                    <td className='px-4 py-2'>
                      <div className='h-5 w-10 rounded bg-gray-300' />
                    </td>
                    <td className='px-4 py-2'>
                      <span className='inline-block h-4 w-4 rounded-full bg-gray-300' />
                      <span className='ml-2 inline-block h-4 w-6 rounded bg-gray-300' />
                    </td>
                    <td className='px-4 py-2'>
                      <div className='h-5 w-20 rounded bg-gray-300' />
                      <div className='mt-1 h-5 w-20 rounded bg-gray-300' />
                    </td>
                    <td className='px-4 py-2'>
                      <div className='flex flex-wrap gap-1'>
                        <span className='inline-block h-5 w-10 rounded bg-gray-300' />
                        <span className='inline-block h-5 w-10 rounded bg-gray-300' />
                        <span className='inline-block h-5 w-10 rounded bg-gray-300' />
                        <span className='inline-block h-5 w-10 rounded bg-gray-300' />
                        <span className='inline-block h-5 w-10 rounded bg-gray-300' />
                      </div>
                    </td>
                    <td className='px-4 py-2 text-center'>
                      <span className='inline-block h-5 w-5 rounded bg-gray-300' />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <nav className='flex items-center justify-between pt-4'>
          <span className='text-sm font-normal text-gray-500'>
            Hiển thị{' '}
            <span className='font-semibold text-gray-900'>
              {(Number(queryString.page) - 1) * LIMIT + 1}-
              {Number(queryString.page) * LIMIT > pagination.total
                ? pagination.total
                : Number(queryString.page) * LIMIT}
            </span>{' '}
            trong <span className='font-semibold text-gray-900'>{pagination.total}</span>
          </span>

          <Pagination
            currentPage={Number(queryString.page)}
            totalPage={Math.ceil(pagination?.total / LIMIT)}
            queryString={queryString}
          />
        </nav>
      )}
    </>
  )
}

AdminProductsPage.layout = layout.admin

export default AdminProductsPage
