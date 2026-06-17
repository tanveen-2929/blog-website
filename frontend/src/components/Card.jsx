import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({article}) => {
  return (
    <>
    <div className="card mb-4">
      <img src={article.image} className="card-img-top" height={220} alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text small text-muted m-0 text-end">Tag: {article.category}</p>
        <p className="card-text text-end text-muted m-0 small">Date: {article.date.substr(0,10)}</p>
        <Link to={"/article/"+article._id} className="btn btn-outline-dark rounded-0 btn-sm">
        Read Full Article</Link>
      </div>
    </div>
    </>
)
}

export default Card