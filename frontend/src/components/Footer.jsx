import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
<footer>
<div className="text-center pt-4  border-bottom">
<h1>Blogging</h1>
<p className="text-uppercase tagline" >personal blog</p>
</div>
  
<nav className="navbar navbar-expand-lg border-bottom text-uppercase fw-bold">
    <ul className="navbar-nav m-auto mb-2 mb-lg-0 text-center">
    <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/blog/1">Blog</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin">Login</Link>
            </li>
      </ul>
</nav>

<div className="row text-center py-3 justify-content-center  border-bottom ">
    <div className="col-1 iclr"> <i className="bi bi-facebook" ></i></div>
    <div className="col-1 iclr"> <i className="bi bi-twitter"></i></div>
    <div className="col-1 iclr"> <i className="bi bi-instagram" ></i></div>
    <div className="col-1 iclr"> <i className="bi bi-pinterest"></i></div>
  </div>
  <div className="text-center pt-3">
   <p>Copyright &copy; blogging @2024</p>
    </div>
    </footer>
      )
}

export default Footer