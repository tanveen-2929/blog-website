import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from "react-router" //eh assi react rouetr ( from google serch otho lyaye aa use param search krk)
import Comment from './CommentForm'
const Article = () => {
  let {id} = useParams();
  const [result, setResult] = useState({date:''})
  const [author, setAuthor] = useState("")
  const [comments, setComments] = useState([])
  
  let url="http://localhost:3000/article/"+id
  useEffect(()=>{
    //Fetch article
    axios.get(url)
    .then((res)=>{setResult(res.data);
      return res.data.user;
    }) 
    .then((uid)=>{
      axios.get("http://localhost:3000/user/"+uid)
      .then((resp)=>{setAuthor(resp.data.name)})
    })
    .catch((err)=>{console.log(err)})

//comment show kron lyi
    axios.get("http://localhost:3000/comment/"+id)
    .then((res)=>{setComments(res.data)})
    .catch((err)=>{console.log(err)})
  },[id,comments])

 
  return (
    <>
    <section className='text-center py-3 border'>
      <h1 className='display-6'> {result.title}</h1>
      <div className="row">
        <div className="col"><p> <i className="bi bi-person"></i> {author} </p> </div>
        <div className="col"><p><i className="bi bi-calendar"></i> {result.date.substr(0,10)}</p></div>
      </div>
    </section>
    <section className="container">
      <img src={result.image} alt="" className='w-75 m-auto d-block mb-3 py-4' height={450} />
      <div dangerouslySetInnerHTML={{__html:result.content}}></div>
    </section> <hr />
    <section className="container">
<Comment article={id}/>
</section>
<section className='container'>
<h5 className='text-uppercase text-center'>Comments:</h5>
{
comments.map((comment, index) => {
  let x=comment._article
        return <div className='col border bg-light shadow-sm rounded m-4 p-2' key={index}>
          <p> Name: {comment.name} <span className='text-end text-muted m-0 small'>{comment.date.substr(0,10)}</span><br/>
          Comment: {comment.comment}</p>
         <span className='text-end text-muted m-0 small'>{comment.date.substr(0,10)}
          </span>
        </div>
        })}
</section>
    </>
  )
}
export default Article