import { signOut } from 'next-auth/react'

export default function UserInfoPage() {
  return (
    <div>
      <div>AccountPage</div>
      <button onClick={() => signOut({ callbackUrl: window.location.origin })}>Đăng xuất</button>
    </div>
  )
}
