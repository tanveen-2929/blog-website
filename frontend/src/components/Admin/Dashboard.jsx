import React,{useState,useEffect} from 'react'
import axios  from 'axios'
const Dashboard = () => {

  const [users,setUsers]=useState(0)
  const [articles,setArticles]=useState(0)
  const [categories,setCategories]=useState(0)

  let url="http://localhost:3000/"
  useEffect(()=>{
  axios.get(url+"article").then((res) => {setArticles(res.data.length); }).catch((err)=>{console.log(err)})
  axios.get(url+"user").then((res) => {setUsers(res.data.length); }).catch((err)=>{console.log(err)})
  axios.get(url+"category").then((res) => {setCategories(res.data.length);}).catch((err)=>{console.log(err)})
},[])
  return (
    <div className='py-5'>
      <h1 className='text-start mb-4 ps-5'>Welcome Admin !!!</h1> <hr />
      <div className="container ps-5">
        <div className="row">
          <div className="col-md-3">
            <div className="border bg-info-subtle p-3 ">
              <h5>Registered Users</h5>
              <p className='display-3 text-end'>{users}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border bg-info-subtle p-3 ">
              <h5>Articles</h5>
              <p className='display-3 text-end'>{articles}</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="border bg-info-subtle p-3 ">
              <h5>Category</h5>
              <p className='display-3 text-end'>{categories}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard