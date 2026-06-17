import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Reset = () => {
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({code:'',password:'',password1:''})
  const [error, setError] = useState({code:'',password:'',password1:''})   
  const [response, setResponse] = useState({response:'',color:''})

  let isError=()=>{
    let saved_code=localStorage.getItem('vcode')
    setError({})
    let e={}
    if (!formdata.code.trim())
      e.code='Verification code is required'
    else if(saved_code!==formdata.code)
      e.code='Verification code is incorrect'
    if (!formdata.password.trim())
      e.password='Password is required'
    else if(formdata.password.length <8)
      e.password="Password must be atleast 8 characters long"
    if (!formdata.password1.trim())
      e.password1='retype Password is required'
    else if(formdata.password1.length <8)
      e.password1="Password must be atleast 8 characters long"
    else if(formdata.password1!==formdata.password)
      e.password1='Password and Retype Password do not match'
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }

  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/user/resetpassword"
    let vemail=localStorage.getItem('vemail')
    if(!isError()){
    axios.put(url,{email:vemail,password:formdata.password})
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        localStorage.removeItem('vcode')
        localStorage.removeItem('vemail')
        setTimeout(()=>navigate('/signin'),2000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }

  return (
<>
     <h2 className="text-center fw-bold pt-4 mb-2 fg1 ">Enter New Password</h2>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="mb-3 pt-4  ">
             <input type="text"   className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your code" value={formdata.code} onChange={(e)=>setFormData({...formdata,code:e.target.value})}/>
             <p className='text-danger small p-0 m-0'>{error.code}</p>

            </div>
            <div className="mb-3 pt-4 ">
              <input type="Password"   className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your Password" value={formdata.password}  onChange={(e)=>setFormData({...formdata,password:e.target.value})} />
              <p className='text-danger small p-0 m-0'>{error.password}</p>

          </div>
          <div className="mb-4 pt-4 ">
              <input type="Password"   className="form-control bg-transparent text-white border-0 border-bottom rounded-0" placeholder="Enter your Password" value={formdata.password1}  onChange={(e)=>setFormData({...formdata,password1:e.target.value})} />
              <p className='text-danger small p-0 m-0'>{error.password1}</p>

          </div>

          <div className="my-4">
            <button className="btn bg-white text-dark w-100 py-2 rounded border" type="submit" name="save">Reset Password</button>
            </div>
        </form>
        <p className="text-center mt-3 pb-4"> Back To<Link to ="/signin" className="text-white text-decoration-none"> Login</Link> </p>
        <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>

    </>  )
}

export default Reset