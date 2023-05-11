import Pagination from '~/components/Pagination'
import ProductItem from '~/components/ProductItem'
import { productsData } from '~/datas/productData'
import useQueryConfig from '~/hooks/useQueryConfig'
import useViewport from '~/hooks/useViewport'

export default function SearchPage() {
  const queryConfig = useQueryConfig()
  const width = useViewport()
  const { keyword, page = 1 } = queryConfig
  const limit = width < 640 ? 6 : width < 1024 ? 8 : width < 1280 ? 10 : 12
  return (
    <div className='c-container'>
      <ul className='mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {productsData.slice((Number(page) - 1) * limit, Number(page) * limit).map((product) => (
          <li key={product.id}>
            <ProductItem product={product} showRating showDiscountPercent />
          </li>
        ))}
      </ul>
      <div className='mt-10'>
        <Pagination
          range={2}
          currentPage={page}
          totalPage={Math.ceil(productsData.length / limit)}
          queryString={{ ...queryConfig, limit }}
        />
      </div>
    </div>
  )
}
