import { signOut, useSession } from 'next-auth/react'
import path from '~/constants/path'

export default function AccountPage() {
  const { status } = useSession({
    required: true,
  })
  return (
    <div>
      <div>AccountPage</div>
      <button onClick={() => signOut({ callbackUrl: window.location.origin })}>Đăng xuất</button>
    </div>
  )
}
