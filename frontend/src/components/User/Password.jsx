import React, { useState } from 'react'
import axios from 'axios'

const Password = () => {
  const userid=localStorage.getItem('userid')
  let url="http://localhost:3000/user/password/"+userid
  const [formdata,setFormData] = useState({old_password:'',password:'',retype_password:''})
  const [error, setError] = useState({old_password:'',password:'',retype_password:''})
  const [response, setResponse] = useState({response:'',color:''})

  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.old_password.trim())
      e.old_password='Old password is required'
    if (!formdata.password.trim())
      e.password='Password is required'
    else if(formdata.password.length <8)
      e.password="Password must be atleast 8 characters long"
    if (!formdata.retype_password.trim())
      e.retype_password='Retype Password is required'
    else if(formdata.retype_password.length <8)
      e.retype_password="Password must be atleast 8 characters long"
    else if(formdata.retype_password!==formdata.password)
      e.retype_password='Password and Retype Password do not match'
    setError(e)
    return Object.keys(e).length>0?true:false      
  }

  let handleSubmit=(e)=>{
    e.preventDefault()
    if(!isError()){
    axios.put(url,formdata)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        setTimeout(()=>setResponse({}),3000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }

  return (
    <>
    <div className="row pt-5">
      <div className="col-6">
        <h3>Change Password</h3><hr />
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label>Old Password</label>
          <input type="password" name='old_password' className='form-control'  value={formdata.old_password} onChange={(e)=>setFormData({...formdata,old_password:e.target.value})}/>
          <p className='text-danger small p-0 m-0'>{error.old_password}</p><br />

          <label>New Password</label>
          <input type="password" name='password' className='form-control'  value={formdata.password} onChange={(e)=>setFormData({...formdata,password:e.target.value})} />
          <p className='text-danger small p-0 m-0'>{error.password}</p><br />

          <label>Confirm Password</label>
          <input type="password" name='retype_password' className='form-control'  value={formdata.retype_password} onChange={(e)=>setFormData({...formdata,retype_password:e.target.value})}/>
          <p className='text-danger small p-0 m-0'>{error.retype_password}</p><br />

          <button className='btn btn-outline-dark'>Change Password</button>

        </form>
        <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
      </div>
    </div>
    </>
  )
}

export default Password