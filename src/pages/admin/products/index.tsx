import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { useQuery } from '@tanstack/react-query'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Pagination from '~/components/Pagination'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product, ProductWithPagination } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'
import { numberAsCurrency } from '~/utils/utils'

export const getServerSideProps: GetServerSideProps<{ data: {} }> = async () => {
  return { props: { data: {} } }
}

const AdminProductsPage = () => {
  const router = useRouter()
  const query = router.query
  const queryString = {
    limit: query.limit ?? '5',
    page: query.page ?? '1',
  }
  const http = useAuthAxios()

  // Get products
  const productsQuery = useQuery({
    queryKey: ['products', queryString],
    queryFn: () =>
      http.get<SuccessResponse<ProductWithPagination>>('/products', {
        params: queryString,
      }),
  })
  const products = productsQuery.data?.data.data.products
  const pagination = productsQuery.data?.data.data.pagination

  return (
    <>
      {!products && <p>Loading...</p>}

      {products && (
        <>
          <table className='w-full border-collapse border border-slate-300'>
            <thead>
              <tr className='border border-slate-300'>
                <td className='w-32 px-2 py-1 text-center font-medium'>Hình ảnh</td>
                <td className='px-2 py-1 text-center font-medium'>Tên</td>
                <td className='w-28 px-2 py-1 text-center font-medium'>Giá</td>
                <td className='w-28 px-2 py-1 text-center font-medium'>Thao tác</td>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr key={product.id} className='border border-slate-300'>
                    <td className='px-2 py-1'>
                      <Image
                        src={product.images[0]?.link || 'https://i.imgur.com/I3fognq.png'}
                        alt={product.name}
                        width={100}
                        height={100}
                        className='mx-auto block rounded-md'
                      />
                    </td>
                    <td className='px-2 py-1 text-sm'>
                      <span className='rounded border border-primary bg-primary/20 px-1 py-0.5 text-primary empty:hidden'>
                        {product.productType?.type}
                      </span>
                      <span>{` ${product.name}`}</span>
                    </td>
                    <td className='px-2 py-1 text-right text-sm'>
                      <p className='text-primary'>
                        {numberAsCurrency(product.priceDiscount)}
                        <sup>đ</sup>
                      </p>
                      <del className='text-danger'>
                        {numberAsCurrency(product.price)}
                        <sup>đ</sup>
                      </del>
                    </td>
                    <td className='px-2 py-1 text-center'>
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
              {products.length == 0 && (
                <tr>
                  <td colSpan={5} className='border border-slate-300 px-2 py-1 text-center italic text-danger'>
                    Không tìm thấy sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {pagination && (
            <div className='mt-10'>
              <Pagination
                currentPage={Number(queryString.page)}
                totalPage={Math.ceil(pagination?.total / pagination.limit)}
                queryString={queryString}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}

AdminProductsPage.layout = layout.admin

export default AdminProductsPage
