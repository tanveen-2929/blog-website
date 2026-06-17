import React from 'react'
import { Outlet } from 'react-router-dom' 
import Sidebar from './Sidebar'
const AdminLayout = () => {
  return (
    <div>
        <Sidebar />
        <div className='container py-5'><Outlet /></div>
    </div>
  )
}

export default AdminLayout