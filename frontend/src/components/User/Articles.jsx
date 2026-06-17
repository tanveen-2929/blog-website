import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Articles = () => {
  const [result, setResult] = useState([])
  const [response, setResponse] = useState({response:'',color:''})
  let url="http://localhost:3000/article"
  useEffect(()=>{
    axios.get(url)
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})
  },[response])

  const handleStatus=(id,s)=>{
    axios.patch(`${url}/${id}`,{status:!s})
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
    <h4 className='text-center pt-5'>User Articles</h4>
    <table className='table'>
      <thead>
      <tr><th>Image</th><th>Title</th><th>Category</th><th>User</th><th>Status</th><th>Date</th></tr>
      </thead>
      <tbody>
        {
          result.map((row,index)=>{
            let x=row._id
            return(
              <tr key={index}>
                <td ><img src={row.image} alt={row.title} width={70} height={70} /></td>
                <td >{row.title}</td>
                <td >{row.category}</td>
                <td >{row.user}</td>
                <td>{row.publish ? 'Publish' : 'Unpublish'}</td>
                <td >{row.date.toString().substr(0,10)}</td>
                <button onClick={()=>handleStatus(x,row.publish)} className='btn'>
                  {row.publish ? <i className='bi bi-x-circle text-danger'></i>: <i className='bi bi-check-circle text-success'></i>}
                  </button>
                </tr>
            )
          })
        }
        </tbody>
    </table>
    </>
  )
}
export default Articles