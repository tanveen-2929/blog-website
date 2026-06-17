import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const userid=localStorage.getItem('userid')
  let url="http://localhost:3000/user/"+userid
  const [formdata,setFormData] = useState({name:'',email:'',phone:'',city:'',dob:'',gender:'',bio:''})
  const [error, setError] = useState({name:'',email:'',phone:'',city:'',dob:'',gender:'',bio:''})
  const [response, setResponse] = useState({response:'',color:''})
  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.name.trim())
      e.name='Name Address is required'
    if (!formdata.email.trim())
      e.email='Email Address is required'
    else if (!/\S+@\S+\.\S+/.test(formdata.email))
      e.email="Invalid Email Address"
    if (!formdata.phone.trim())
      e.phone='Phone Address is required'
    else if (!/^[0-9]{10}$/.test(formdata.phone))
      e.phone="Invalid Phone Number"
    if (!formdata.city.trim())
      e.city='City is required'
    if (!formdata.dob.trim())
      e.dob='Date of birth is required'
    if (!formdata.gender.trim())
      e.gender='Gender is required'
    if (!formdata.bio.trim())
      e.bio='Bio is required'
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
        setTimeout(()=>{setResponse({})},3000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }

  useEffect(()=>{
    axios.get(url)
    .then((res)=>setFormData(res.data))
    .catch((err)=>console.log(err))
},[])

  return (
    <>
    <h1  className=' pt-5'>Hello {formdata.name && formdata.name.toUpperCase()}</h1>
    <h3>Update Profile</h3> <hr  className='w-75'/>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <div className="row mb-3">
      <div className="col-4">
        <label>Full Name:</label>
        <input type="text" name='name' placeholder='Enter Name' className='form-control' value={formdata.name} onChange={(e)=>setFormData({...formdata,name:e.target.value})} />
        <p className='text-danger small p-0 m-0'>{error.name}</p>

      </div>
      <div className="col-4">
        <label>Email Address:</label>
        <input type="text" name='email' placeholder='Email Address' className='form-control' value={formdata.email} onChange={(e)=>setFormData({...formdata,email:e.target.value})}/>
        <p className='text-danger small p-0 m-0'>{error.email}</p>

      </div>
    </div>
    <div className="row mb-3">
      <div className="col-4">
        <label>Phone:</label>
        <input type="tel" name='phone' placeholder='Phone No' className='form-control' value={formdata.phone} onChange={(e)=>setFormData({...formdata,phone:e.target.value})}/>
        <p className='text-danger small p-0 m-0'>{error.phone}</p>

      </div>
      <div className="col-4">
        <label>City Name:</label>
        <input type="text" name='city' placeholder='Your City' className='form-control' value={formdata.city} onChange={(e)=>setFormData({...formdata,city:e.target.value})}/>
        <p className='text-danger small p-0 m-0'>{error.city}</p>

      </div>
    </div>
    <div className="row mb-3">
      <div className="col-4">
        <label>DOB:</label>
        <input type="date" name='date' className='form-control' value={formdata.dob && formdata.dob.slice(0,10)} onChange={(e)=>setFormData({...formdata,dob:e.target.value})}/>
        <p className='text-danger small p-0 m-0'>{error.dob}</p>

      </div>
      <div className="col-4">
      <label>Gender:</label><br />
      <input type="radio" name='gen' value="female"  onChange={(e)=>setFormData({...formdata,gender:e.target.value})} checked={formdata.gender=="female" && true} /> Female &nbsp;
      <input type="radio" name='gen' value="male"   onChange={(e)=>setFormData({...formdata,gender:e.target.value})} checked={formdata.gender=="male" && true}/> Male
      <p className='text-danger small p-0 m-0'>{error.gender}</p>
      </div>
    </div>
    <div className="row mb-3">
      <div className="col-8">
        <label>About Yourself (BIO) ! :</label>
        <textarea name="Name" placeholder='Enter Name' className='form-control' value={formdata.bio} onChange={(e)=>setFormData({...formdata,bio:e.target.value})}></textarea>
        <p className='text-danger small p-0 m-0'>{error.bio}</p>

      </div>
    </div>
    <button type='submit' className='btn btn-outline-dark'>Update Profile</button>

    </form>
    <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>

    </>
  )
}
export default Profile