import React from 'react'
import CreateCategory from './CreateCategory'
import CategoryList from './CategoryList'
const Category = () => {
  return (
    <div className='py-5 row justify-content-end gap-5'>
      <div className="col-5">
        <CreateCategory/>
      </div>
      <div className="col-5">
        <CategoryList/>
      </div>
    </div>
  )
}
export default Category