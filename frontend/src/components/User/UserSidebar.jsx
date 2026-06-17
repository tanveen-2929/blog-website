import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
const Sidebar = () => {
  const navigate = useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('userid')
    navigate('/')
  }
  return (
    <>
    <nav className="navbar navbar-dark bg-dark fixed-top">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <Link className="navbar-brand" to="/">Blogging </Link>
    <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Welcome User</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
        <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create">Write Articles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/list">My Articles</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">My Account</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/avatar">My Image</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/password">Change Password</Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav> 
    </>
  )
}
export default Sidebar