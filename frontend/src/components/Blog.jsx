import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from './Card'
import { useParams } from "react-router"   //eh assi react rouetr ( from google serch otho lyaye aa use param search krk)

const Blog = () => {
  let {category} = useParams();
  const [result, setResult] = useState([])
  let url="http://localhost:3000/article/category/"+category
  useEffect(()=>{
    axios.get(url)
    .then((res)=>{setResult(res.data)})
    .catch((err)=>{console.log(err)})
  },[category])
  return (
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
    </div>  )
}

export default Blog