import { useQuery } from '@tanstack/react-query'
import React from 'react'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'

const AdminCategoriesPage = () => {
  const http = useAuthAxios()
  // const categoryQuery = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: () => http.get
  // })

  return <div>AdminCategoriesPage</div>
}

AdminCategoriesPage.layout = layout.admin

export default AdminCategoriesPage
