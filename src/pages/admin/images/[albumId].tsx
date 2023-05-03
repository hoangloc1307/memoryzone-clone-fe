import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import layout from '~/constants/layout'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Image as ImageType } from '~/types/image.type'
import { SuccessResponse } from '~/types/response.type'

const AdminImageAlbumPage = () => {
  const { data: session } = useSession()
  const http = useAuthAxios()
  const router = useRouter()
  const albumId = router.query.albumId

  const imageQuery = useQuery({
    queryKey: ['albums', albumId],
    queryFn: () => http.get<SuccessResponse<ImageType[]>>(`/image/${albumId}`),
    enabled: !!albumId && !!session,
  })
  const images = imageQuery.data?.data.data

  return (
    <div className='grid grid-cols-10 gap-5'>
      {!images && <p>Loading</p>}
      {images &&
        images.map((image) => (
          <a
            key={image.id}
            href={image.link}
            target='_blank'
            title={image.description || ''}
            className='relative aspect-square cursor-pointer overflow-hidden rounded border border-slate-300 hover:border-primary'
          >
            <Image src={image.link} alt={image.title || 'Product Image'} fill className='object-contain' />
          </a>
        ))}
    </div>
  )
}

AdminImageAlbumPage.layout = layout.admin

export default AdminImageAlbumPage
