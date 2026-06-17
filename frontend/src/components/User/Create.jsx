import React, { useState ,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'

const Create = () => {
  const userid=localStorage.getItem('userid')
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({title:'',category:'',image:''})
  const [content,setContent] = useState('')
  const [error, setError] = useState({title:'',content:'',category:'',image:''})
  const [response, setResponse] = useState({response:'',color:''})
  const [category, setCategory] = useState([])
  useEffect(()=>{
    axios.get("http://localhost:3000/category")
    .then((res)=>{setCategory(res.data)})
    .catch((err)=>{console.log(err)})
  },[]) //kise de chnge hon te categories chnge hon fr dependency lgdi a  mtlb kise de chnge hon te useeffect fr call krna pve fr eh dependency use hundi a

  let isError=()=>{
    setError({})
    let e={}
    let ext=formdata.image.name.split('.')[1]  // e ta use hoya ki 0 number te image da name te 1 te jpg png ya jpeg te . to split kita
    if (!formdata.title.trim())
      e.title='Article Title is required'
    if (!formdata.category.trim())
      e.category='Choose Category'
    if(ext!='jpg' && ext!='png' && ext!='jpeg')
      e.image='Only jpg, png, jpeg are allowed'
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }
  
  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/article"
    if(!isError()){
      const data=new FormData();
      data.append('title',formdata.title);
      data.append('content',content);
      data.append('category',formdata.category);
      data.append('image',formdata.image);
      data.append('user',userid);
    axios.post(url,data)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
        setTimeout(()=>navigate('/list'),3000)
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }
 
  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)}  className=' pt-5'>
    <div className="row mb-3">
      <div className="col-7">
        <label>Title :</label>
        <input type="text" name='title' placeholder='Enter Name' className='form-control' value={formdata.title} onChange={(e)=>setFormData({...formdata,title:e.target.value})} />
        <p className='text-danger small p-0 m-0'>{error.title}</p> <br />
        <Editor text="Write Content" setContent={setContent}/>
        {/* <textarea name="content" className='form-control' rows="7" onChange={(e)=>setFormData({...formdata,content:e.target.value})}></textarea> */}
      </div>
      <div className="col-4">
        <label>Category :</label>
        <select name="category" className='form-select' defaultValue={formdata.category} onChange={(e)=>setFormData({...formdata,category:e.target.value})}>
        <option value="">Select Category</option>
        {category.map((row,index)=><option key={index} value={row.category}>{row.category}</option>
        )}
        </select>
        <p className='text-danger small p-0 m-0'>{error.category}</p> <br/>
        <input type="file" name='image' className='form-control'  onChange={(e)=>setFormData({...formdata,image:e.target.files[0]})}/>
        <p className='text-danger small p-0 m-0'>{error.image}</p> <br/>
        <button type='submit' className='btn btn-outline-secondary w-100 mb-3'>Save Article</button>
        <button type='reset' className='btn btn-outline-secondary w-100'>Clear</button>
      </div>
    </div>
    </form>
    <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
    </>
  )
}

export default Create