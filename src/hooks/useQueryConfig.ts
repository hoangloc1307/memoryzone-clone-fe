import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useRouter } from 'next/router'
import { ProductListConfig } from '~/types/product.type'

export default function useQueryConfig() {
  const router = useRouter()
  const queryParams: ProductListConfig = router.query
  const queryConfig: ProductListConfig = omitBy(
    {
      page: queryParams.page || 1,
      sort_by: queryParams.sort_by || 'default',
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
    },
    isUndefined
  )
  return queryConfig
}
