import React, { useEffect, useState } from 'react'
import axios from 'axios'
 
const CategoryList = () => {
  const [result, setResult] = useState([])
  const [response, setResponse] = useState({response:'',color:''})

  let url="http://localhost:3000/category"
  useEffect(()=>{
    axios.get(url)
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})
  },[response])

  const handleDelete=(id)=>{
    axios.delete(`${url}/${id}`)
    .then((res)=>{
      if(res.data.status==1)
        setResponse({response:res.data.Response,color:'success'})
      else
      setResponse({response:res.data.Response,color:'danger'})
      setTimeout(()=>setResponse({}),2000)
 
    })
    .catch((err)=>{console.log(err)})
  }
  return (
    <>
    <h4 className='text-center'>Categories</h4>
  <div className={'m-0 p-2 alert alert-'+response.color}>{response.response}</div>
    <table className='table'>
      <thead>
      <tr><th>Category</th><th>Action</th></tr>
      </thead>
      <tbody>
        {
          result.map((row,index)=>{
            let x=row._id
            return(
              <tr key={index}>
                <td ><i className={`bi bi-${row.icon}`}> </i>{row.category} <p className='small m-0'>{row.short_des}</p></td>
                <td><button onClick={()=>handleDelete(x)} className='btn'>
                <i className='bi bi-trash text-danger'></i></button></td>
              </tr>
            )
          })
        }
        </tbody>
    </table>
    </>
  )
}
export default CategoryList