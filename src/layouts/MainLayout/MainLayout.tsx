import { ReactElement } from 'react'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'

export default function MainLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
