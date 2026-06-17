import React from 'react'
import { Outlet } from 'react-router-dom' 
import UserSidebar from './UserSidebar'

const UserLayout = () => {
  return (
    <>
    <UserSidebar />
    <div className='container py-5'>
    <Outlet />
</div>
</>  )
}

export default UserLayout 