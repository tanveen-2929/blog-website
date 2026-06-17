import Card from './Card'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Home = () => {
  const [result, setResult] = useState([])
  const [category, setCategory] = useState([])
  let url="http://localhost:3000/"
  useEffect(()=>{
    axios.get(url+"article/recent")
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})

    axios.get(url+"category")
    .then((resp)=>{setCategory(resp.data)})
    .catch((err)=>{console.log(err)})
  },[])

  return (
    <>
    {/*Recent Article*/}
    <div className="bg-danger py-5 text-white text-center">
      <h1 className='display-2 mt-5'>Explore, Inspire, Empower</h1>
      <p className='fs-1 mb-5'>Life's a Journey, Let's Explore It Together</p>
      </div>
      <div className='container mt-5'>
      <div className="row">
      {
        category.map((cat, index) => {
        return <div className="col" key={index}>
          <Link className="text-dark text-decoration-none" to={`/blog/${cat.category}`}>
          <div className='border py-5 text-center'>
          <i className={`bi bi-${cat.icon}`}></i>
            <h5>{cat.category}</h5>
          </div>
          </Link>
        </div>
        })
      }
      </div>
    </div>
    <div className='container mt-5'>
      <div className="row">
      {
        result.map((article, index) => {
        return <div className="col-md-4" key={index}>
          <Card article={article}/>
        </div>
        })
      }
      </div>
    </div>
   
    </>
  )
}

export default Home