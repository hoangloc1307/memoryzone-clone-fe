import { ReactNode } from 'react'

export default function AuthenticationLayout({ children }: { children: ReactNode }) {
  return <div className='flex min-h-screen items-center justify-center'>{children}</div>
}
