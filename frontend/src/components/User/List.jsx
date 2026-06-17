import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const List = () => {
  const userid=localStorage.getItem('userid')
  const [result, setResult] = useState([]) 
  const [response, setResponse] = useState({response:'',color:''})

  let url="http://localhost:3000/article"
  useEffect(()=>{
    axios.get(url+"/user/"+userid)
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
      <h4 className='text-center pt-5'>Articles</h4>
      <div className={'m-0 p-2 alert alert-'+response.color}>{response.response}</div>
    <table className='table'>
    <thead>
    <tr>
    <th>Image</th>
    <th>Title</th>
    <th>Category</th> 
    <th>Added On</th>
    <th>Status</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody>
        {
          result.map((row,index)=>{
            let x=row._id
            return(
              <tr key={index}>
                <td><img src={row.image} alt={row.title} width={70} height={70} /></td>
                <td>{row.title}</td>
                <td>{row.category}</td>
                <td>{row.date.toString().substr(0,10)}</td>
                <td>{row.publish ? 'Publish' : 'Unpublish'}</td>
                <td><button onClick={()=>handleDelete(x)} className='btn'><i className='bi bi-trash text-danger'></i></button>
                <Link to={"/update/"+x}><i className='bi bi-pencil text-info'></i></Link>
                </td>
              </tr>
            )
          })
        }
</tbody>
  </table>
  </>
    )
}

export default List