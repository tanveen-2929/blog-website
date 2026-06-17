import React, { useState } from 'react' 
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Login = () => { 
    let {isAdminLoggedIn , setIsAdminLoggedIn} =useAuth()
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({email:'',password:''})
  const [error, setError] = useState({email:'',password:''})
  const [response, setResponse] = useState({response:'',color:''})
  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.email.trim())
      e.email='Email Address is required'
    else if (!/\S+@\S+\.\S+/.test(formdata.email))
      e.email="Invalid Email Address"
    if (!formdata.password.trim())
      e.password='Password is required'
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }
  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/admin/login"
    if(!isError()){
    axios.post(url,formdata)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        localStorage.setItem('admin',res.data.adminid)
        setIsAdminLoggedIn(true)
        setTimeout(()=>navigate('/dashboard'),1000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }
  return (
<>
     <h2 className="text-center fw-bold pt-4 mb-2 fg1 ">Admin Login</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-3 pt-4  ">
             <input type="text" className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your email" value={formdata.email} onChange={(e)=>setFormData({...formdata,email:e.target.value})}/>
             <p className='text-danger small p-0 m-0'>{error.email}</p>
            </div>
            <div className="mb-4 pt-4 ">
              <input type="Password" className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your Password" value={formdata.password}  onChange={(e)=>setFormData({...formdata,password:e.target.value})} />
              <p className='text-danger small p-0 m-0'>{error.password}</p>
          </div>
          <div className="my-4 ">
            <button className="btn bg-white text-dark w-100 py-2 rounded border" type="submit" name="save">Log In</button>
            <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
            </div>
        </form>
    </>  
    )
}
export default Login