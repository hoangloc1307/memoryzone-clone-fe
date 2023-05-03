import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import layout from '~/constants/layout'
import path from '~/constants/path'
import useAuthAxios from '~/hooks/useAuthAxios'
import { Album } from '~/types/image.type'
import { SuccessResponse } from '~/types/response.type'

const AdminImagePage = () => {
  const http = useAuthAxios()
  const { data: session } = useSession()

  const albumQuery = useQuery({
    queryKey: ['albums'],
    queryFn: () => http.get<SuccessResponse<{ data: Album[] }>>('/image'),
    enabled: !!session,
  })
  const albums = albumQuery.data?.data.data.data

  return (
    <>
      {!albums && <p>Loading</p>}
      <div className='flex flex-wrap gap-5'>
        {albums &&
          albums.map((album) => (
            <Link
              href={`${path.admin.images}/${album.id}`}
              key={album.id}
              className='block rounded border border-slate-300 p-3'
            >
              <p>id: {album.id}</p>
              <p>title: {album.title}</p>
              <p>cover: {album.cover}</p>
              <p>datetime: {album.datetime}</p>
              <p>deletehash: {album.deletehash}</p>
              <p>images_count: {album.images_count}</p>
              <p>link: {album.link}</p>
              <p>order: {album.order}</p>
              <p>privacy: {album.privacy}</p>
            </Link>
          ))}
      </div>
    </>
  )
}

AdminImagePage.layout = layout.admin

export default AdminImagePage
