import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import useAuthAxios from '~/hooks/useAuthAxios'
import { SuccessResponse } from '~/types/response.type'
import { User } from '~/types/user.type'

export default function UserInfoPage() {
  const http = useAuthAxios()
  const { data: session } = useSession()

  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return http.get<SuccessResponse<User>>('/user')
    },
    enabled: !!session,
  })

  const user = userData?.data.data

  return (
    <div className='c-container'>
      <p>Họ tên: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Địa chỉ: {user?.address}</p>
      <p>Ngày sinh: {user?.dayOfBirth}</p>
      <p>Điện thoại: {user?.phone}</p>
      <p>Ảnh đại diện: {user?.avatar}</p>
      <p>Loại tài khoản: {user?.type}</p>
    </div>
  )
}
