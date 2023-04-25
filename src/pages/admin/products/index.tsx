import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Product } from '~/types/product.type'
import { SuccessResponse } from '~/types/response.type'
import { numberAsCurrency } from '~/utils/utils'

const AdminProductsPage = () => {
  const http = useAuthAxios()
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => http.get<SuccessResponse<Product[]>>('/products'),
  })
  const products = productsQuery.data?.data.data

  return (
    <div>
      {!products && <p>Loading...</p>}
      {products && (
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
                    <span className='font-medium text-primary'>[{product.productType?.type || 'UNKNOWN'}]</span>
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
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='h-6 w-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                        />
                      </svg>
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
      )}
    </div>
  )
}

AdminProductsPage.layout = layout.admin

export default AdminProductsPage
