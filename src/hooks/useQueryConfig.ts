import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useRouter } from 'next/router'
import { ProductListConfig } from '~/types/product.type'

export default function useQueryConfig() {
  const router = useRouter()
  const queryParams: ProductListConfig = router.query
  const queryConfig: ProductListConfig = omitBy(
    {
      q: queryParams.q,
      slug: queryParams.slug,
      page: queryParams.page,
      limit: queryParams.limit,
      view: queryParams.view,
      sort_by: queryParams.sort_by,
      price_min: queryParams.price_min,
      price_max: queryParams.price_max,
    },
    isUndefined
  )
  return queryConfig
}
