import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className='grid grid-cols-12'>
      <aside className='col-span-2'>Sidebar</aside>
      <div className='col-span-10'>
        <div>Topbar</div>
        <main>{children}</main>
      </div>
    </div>
  )
}
