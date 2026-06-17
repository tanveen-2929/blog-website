import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const Header = () => {

    let {isUserLoggedIn , setIsUserLoggedIn , isAdminLoggedIn , setIsAdminLoggedIn} =useAuth()
    const handleLogout=()=>{
      localStorage.removeItem('userid')
      setIsUserLoggedIn(false)
    }
  const [result, setResult] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/category")
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})
  },[])

  return (
    <header>
        <div className="row  border-bottom">
      <div className="col-xl-3 col-md-6 text-center pt-2 mt-2">
        <p className="fst-italic">Hello Nice people,Welcome to my Blog</p>
      </div>
      <div className="col-xl-3 col-md-6 border-start pt-2 ">
        <p className=" pt-2 fst-italic">contact@navblog.com</p>
        
      </div>
      <div className="col-xl-3 col-md-6 border-start pt-2">
         <form>
          <div className="input-group mb-3">
            <input type="text" className="form-control border-0" placeholder="Search"/>
            <button className="input-group-text border-0 bg-white"><i className="bi bi-search"></i></button>
          </div>
         </form>
      </div>
      <div className="col-xl-3 col-md-6 border-start pt-2">
        <div className="row text-center pt-2">
          <div className="col-3 iclr"> <i className="bi bi-facebook" ></i></div>
          <div className="col-3 iclr"> <i className="bi bi-twitter" ></i></div>
          <div className="col-3 iclr"> <i className="bi bi-instagram" ></i></div>
          <div className="col-3 iclr"> <i className="bi bi-pinterest" ></i></div>
        </div>
      </div>
  </div>
   <div className="text-center pt-4">
        <h1>Blogging</h1>
        <p className="text-uppercase tagline" >personal blog</p>
      </div>
  
 <nav className="navbar navbar-expand-lg bg-body-white border-top fw-bold text-uppercase ">
        <div className="container">
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Blog
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          {
          result.map((row,index)=>{
          return <li key={index}>
            <Link className="dropdown-item" to={`/blog/${row.category}`}>
            <i className={`bi bi-${row.icon}`}> </i>{row.category} </Link></li>
          })}
          </ul>
        </li>
        {
          isUserLoggedIn ?
          (<>
            <li className="nav-item">
                <Link className="nav-link" to="/profile">Account</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/create">Write Article</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>Logout</a>
            </li>
          </>)
          :
          (<>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signin">Login</Link>
            </li>
          </>)
        }

        {
          isAdminLoggedIn && ( // && it means ager ik true aa te show ho jaye ga
            <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
        </li>
          )
        }
            </ul>
         </div>
        </div>
      </nav>
    </header>
  )
}

export default Header