import React, { useState } from 'react'
import axios from 'axios'

const CommentForm = ({article}) => {
  const [formdata,setFormData] = useState({name:'',email:'',comment:''})
  const [error, setError] = useState({name:'',email:'',comment:''})
  const [response, setResponse] = useState({response:'',color:''})
  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.name.trim())
      e.name='Name is required'
    if (!formdata.email.trim())
      e.email='Email Address is required'
    else if (!/\S+@\S+\.\S+/.test(formdata.email))
      e.email="Invalid Email Address"
    if (!formdata.comment.trim())
      e.comment='Comment is required'
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }

  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/comment"
    formdata.article=article
    if(!isError()){
    axios.post(url,formdata)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        console.log(res.data); 
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }


  return (
    <>
    <h2  className='py-3 text-center'>Leave your Comment</h2>
    <form onSubmit={(e)=>handleSubmit(e)}>
    <div className="row mb-3 justify-content-center">
      <div className="col-4 ">
        <label>Full Name:</label>
        <input type="text" name='name' placeholder='Enter Name' className='form-control' value={formdata.name} onChange={(e)=>setFormData({...formdata,name:e.target.value})} />
        <p className='text-danger small p-0 m-0'>{error.name}</p>
      </div>
      <div className="col-4 ">
        <label>Email Address:</label>
        <input type="text" name='email' placeholder='Email Address' className='form-control' value={formdata.email} onChange={(e)=>setFormData({...formdata,email:e.target.value})} />
        <p className='text-danger small p-0 m-0'>{error.email}</p>
      </div>   
      </div>
      <div className="row mb-3 justify-content-center">
      <div className="col-8 ">
        <label>Comment: </label>
        <textarea name="text" placeholder='Enter Comment' className='form-control'rows={6} value={formdata.comment} onChange={(e)=>setFormData({...formdata,comment:e.target.value})}></textarea>
        <p className='text-danger small p-0 m-0'>{error.comment}</p>
      </div>    
      <button type='submit' className='btn btn-outline-dark mt-3 w-50 '>Submit Your Comment</button>
      </div>
    </form>
    <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
    </>
  )
}

export default CommentForm