import React from 'react'
import { Outlet } from 'react-router-dom' 
import { Link } from 'react-router-dom'
const AuthLayout = () => {
return (
<>
<div className="bgimg">
<div className="row justify-content-center py-5">
<div className="col-10 col-sm-8 col-md-6 col-lg-4  border mt-5 px-4 rounded bg-blur text-white " style={{"backdropFilter": "blur(9px)" }}>
<Outlet />
<div className='text-center'>
    <Link to="/" className='text-white text-decoration-none'>
    <i className='bi bi-arrow-left-circle'></i> Back To Home
    </Link>
</div>
</div></div>
</div> 
</>
)
}

export default AuthLayout