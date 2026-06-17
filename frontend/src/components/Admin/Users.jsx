import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Users = () => {
  const [result, setResult] = useState([])
  let url="http://localhost:3000/user"
  useEffect(()=>{
    axios.get(url)
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})
  },[])

  return (
    <>
    <h4 className='text-center py-5'>Registered Users</h4>
    <table className='table'>
      <thead>
      <tr><th>Name</th><th>Email</th><th>Phone</th><th>City</th><th>Date</th></tr>
      </thead>
      <tbody>
        {
          result.map((row,index)=>{
            let x=row._id
            return(
              <tr key={index}>
                <td >{row.name}</td>
                <td >{row.email}</td>
                <td >{row.phone}</td>
                <td >{row.city}</td>
                <td >{row.date.toString().substr(0,10)}</td>
                </tr>
            )
          })
        }
        </tbody>
    </table>
    </>
  )
}
export default Users