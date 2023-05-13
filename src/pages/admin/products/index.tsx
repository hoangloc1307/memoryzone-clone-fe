import { MagnifyingGlassIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { format } from 'date-fns'
import debounce from 'lodash/debounce'
import isNil from 'lodash/isNil'
import omitBy from 'lodash/omitBy'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nProgress from 'nprogress'
import { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '~/components/Button'
import Dialog from '~/components/Dialog'
import Pagination from '~/components/Pagination'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product, ProductWithPagination } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'
import { isAxiosError, numberAsCurrency } from '~/utils/utils'

const LIMIT = 10

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  return { props: {} }
}

const AdminProductsPage = () => {
  const queryClient = useQueryClient()
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
    onError(err) {
      if (isAxiosError<SuccessResponse<undefined>>(err)) {
        toast.error(err.response?.data.message)
      }
    },
  })
  const products = productsQuery.data?.data.data.products
  const pagination = productsQuery.data?.data.data.pagination

  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: () => http.post<SuccessResponse<{ id: number }>>('/products/drafts'),
    onMutate() {
      nProgress.start()
    },
    onSettled() {
      nProgress.done()
    },
  })

  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: boolean }) =>
      http.patch<SuccessResponse<undefined>>(`/products/${id}`, { status }),
    onMutate() {
      nProgress.start()
    },
    onSuccess(data) {
      productsQuery.refetch()
      toast.success(data.data.message)
    },
    onSettled() {
      nProgress.done()
    },
  })

  // Handle search keyword change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setKeyword(value)
    debounceCallApi(value)
  }

  // Handle preload product when hover
  const handlePreloadProduct = (id: number) => () => {
    queryClient.prefetchQuery(['products', String(id)], {
      queryFn: () => http.get<SuccessResponse<Product>>(`/products/${id}`),
      staleTime: 60 * 1000,
    })
  }

  // Handle add new product draft
  const handleAddNewProduct = () => {
    addProductMutation.mutate(undefined, {
      onSuccess(data) {
        router.push({
          pathname: `${path.admin.products}/${data.data.data.id}`,
        })
      },
    })
  }

  // Handle delete product
  const handleDeleteProduct = (id: number) => () => {
    updateProductMutation.mutate({ id, status: false })
  }

  return (
    <>
      {/* Search */}
      <div className='flex items-center justify-between'>
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
        <Button leftIcon={PlusIcon} onClick={handleAddNewProduct} loading={addProductMutation.isLoading}>
          Thêm sản phẩm
        </Button>
      </div>

      {/* Table */}
      <div className='c-scrollbar overflow-x-auto'>
        <table className='mt-5 w-[1000px] min-w-full text-left text-sm text-gray-500 lg:w-[1200px]'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th className='w-80 px-4 py-3'>Sản phẩm</th>
              <th className='w-32 px-4 py-3 text-center'>Loại</th>
              <th className='w-24 px-4 py-3 text-center'>Tồn kho</th>
              <th className='w-28 px-4 py-3 text-center'>Giá</th>
              <th className='px-4 py-3 text-center'>Danh mục</th>
              <th className='w-40 px-4 py-3 text-center'>Cập nhật lần cuối</th>
              <th className='w-24 px-4 py-3 text-center'>Thao tác</th>
            </tr>
          </thead>
          <tbody
            className={classNames({
              'animate-pulse': !products,
            })}
          >
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
                      className='mx-auto block h-[50px] w-[50px] shrink-0 rounded-md object-contain'
                    />
                    <span className='flex-grow line-clamp-3'>{product.name}</span>
                  </th>
                  <td className='px-4 py-2 text-center'>
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
                  <td className='px-4 py-2 text-right font-medium'>
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
                  <td className='px-4 py-2 text-center text-xs font-medium text-gray-900'>
                    {product.updatedAt && format(new Date(product.updatedAt), 'dd/MM/yyyy HH:mm:ss')}
                  </td>
                  <td className='px-4 py-2'>
                    <div className='flex gap-1'>
                      <Link href={`${path.admin.products}/${product.id}`} className='p-2 hover:text-blue-400'>
                        <PencilSquareIcon className='h-5 w-5' onMouseEnter={handlePreloadProduct(product.id)} />
                      </Link>
                      <Dialog
                        onConfirm={handleDeleteProduct(product.id)}
                        heading='Xác nhận xoá'
                        content={`Bạn chắc chắn muốn xoá sản phẩm '${product.name || product.id}'`}
                      >
                        <TrashIcon className='h-9 w-9 cursor-pointer p-2 hover:text-red-500' />
                      </Dialog>
                    </div>
                  </td>
                </tr>
              ))}

            {/* No products */}
            {products && products.length == 0 && (
              <tr>
                <td colSpan={6} className='px-4 py-2 text-center italic text-danger'>
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
        <nav className='flex items-center justify-end gap-10 pt-4'>
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
