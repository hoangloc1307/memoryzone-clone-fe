import { GetServerSideProps } from 'next'
import { getToken } from 'next-auth/jwt'
import { getSession, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import layout from '~/constants/layout'

type Data = {
  status: string
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

export const getServerSideProps: GetServerSideProps<{ data: Data | null }> = async ({ req, res }) => {
  // const token = await getToken({ req })
  // const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/refresh-token`, {
  //   method: 'patch',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ refreshToken: token?.refreshToken }),
  // })
  // const data: Data = await response.json()
  // if (data.status === 'Error') {
  //   console.log('test')
  //   await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signout`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       cookie: req.headers.cookie,
  //     } as HeadersInit,
  //     body: JSON.stringify({ callbackUrl: '/login' }),
  //   })
  //   return { props: { data: null } }
  // }
  return { props: { data: null } }
}

const Dashboard = ({ data }: { data: Data }) => {
  console.log(data)
  // const {update} = useSession()

  // useEffect(() => {
  //   update({
  //     accessToken: response.data.data.accessToken,
  //     refreshToken: response.data.data.refreshToken,
  //   })
  // }, [])
  return <div>Dashboard</div>
}

Dashboard.layout = layout.admin

export default Dashboard
