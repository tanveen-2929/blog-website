import React, { useState } from 'react'
import axios from 'axios'

const CreateCategory = () => {
  const [formdata,setFormData] = useState({category:'',icon:'',short_des:''})
  const [error, setError] = useState({})
  const [response, setResponse] = useState({response:'',color:''})

  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.category.trim())
      e.category='Category is required'
    if (!formdata.icon.trim())
      e.icon='Icon is required'
    if (!formdata.short_des.trim())
      e.short_des='Short description is required'
    setError(e)
    return(e.category || e.icon || e.short_des)?true :false
  }

  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    if(!isError()){
    let url="http://localhost:3000/category"
    axios.post(url,formdata)
    .then((res)=>{
      if(res.data.status==1)
        setResponse({response:res.data.Response,color:'success'})
      else
      setResponse({response:res.data.Response,color:'danger'})
      setTimeout(()=>window.location.reload(),500)
  })
    .catch((err)=>console.log(err))
  }
  }
  return (
    <>
    <h4 className='text-center'>New Category</h4>
    <form onSubmit={(e)=>handleSubmit(e)}>
      <p className='text-danger small p-0 m-0'>{error.category}</p>
      <label>Category Name:</label>
      <input type="text" name="categoryName" className='form-control mb-3' value={formdata.category} onChange={(e)=>setFormData({...formdata,category:e.target.value})} />
      <p className='text-danger small p-0 m-0'>{error.icon}</p>
      <label>Category Icon:</label>
      <input type="text" name="categoryIcon" className='form-control mb-3' value={formdata.icon} onChange={(e)=>setFormData({...formdata,icon:e.target.value})} />
      <p className='text-danger small p-0 m-0'>{error.short_des}</p>
      <label>Category Description:</label>
      <textarea name="" id="" className='form-control mb-3' value={formdata.short_des} onChange={(e)=>setFormData({...formdata,short_des:e.target.value})}></textarea>
      <button className='btn btn-dark'>Save Category</button>
    </form>
    <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
    </>
  )
}
export default CreateCategory