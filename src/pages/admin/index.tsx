import { ReactElement } from 'react'
import AdminLayout from '~/layouts/AdminLayout'

const Dashboard = () => {
  return <div>Dashboard</div>
}

Dashboard.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Dashboard
