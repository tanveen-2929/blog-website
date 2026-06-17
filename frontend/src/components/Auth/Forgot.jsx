import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Forgot = () => {
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({email:''})
  const [error, setError] = useState({email:''})
  const [response, setResponse] = useState({response:'',color:''})
  
  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.email.trim())
      e.email='Email Address is required'
    else if (!/\S+@\S+\.\S+/.test(formdata.email))
      e.email="Invalid Email Address"
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }

  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/user/forgot"
    if(!isError()){
    axios.post(url,formdata)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        localStorage.setItem('vcode',res.data.code)
        localStorage.setItem('vemail',formdata.email)
        setTimeout(()=>navigate('/reset'),3000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }


  return (
<>
     <h2 className="text-center fw-bold pt-4 mb-2 fg1 ">Password Reset</h2>
     <p className='text-center mt-3'>Forgotten your password? Enter your email address below, and we'll email instructions for setting a new one.</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-3 pt-4  ">
             <input type="text"  className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your email" value={formdata.email} onChange={(e)=>setFormData({email:e.target.value})}/>
             <p className='text-danger small p-0 m-0'>{error.email}</p>

            </div>
          <div className="my-4">
            <button className="btn bg-white text-dark w-100 py-2 rounded border" type="submit" name="save">Send Request</button>
            </div>
        </form>
        <p className="text-center mt-3 pb-4"> Back To<Link to ="/signin" className="text-white text-decoration-none"> Login</Link> </p>
        <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>

    </>  )
}

export default Forgot 