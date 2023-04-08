import { getSession } from 'next-auth/react'
import { ReactElement } from 'react'
import AdminLayout from '~/layouts/AdminLayout'

export async function getServerSideProps(context: any) {
  const session = await getSession(context.req)
  console.log('session:', session)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}

const Dashboard = () => {
  return <div>Dashboard</div>
}

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
