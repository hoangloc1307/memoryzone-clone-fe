import { ReactNode } from 'react'
import Footer from '~/layouts/components/Footer'
import Header from '~/layouts/components/Header'
import BackToTop from '../components/BackToTop'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Header />
      <main className='relative py-5'>{children}</main>
      <Footer />
      <BackToTop />
    </>
  )
}
