import React, { useState ,useEffect } from 'react'                  //profile te avatar daa km ehde ch kitaa mix krk
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Editor from './Editor'
import { useParams } from "react-router"                                                  

const Update = () => {
  let {id} = useParams();   //id pta lgi jo lai k aaye
  const navigate = useNavigate();
  const [formdata,setFormData] = useState({title:'',category:'',image:'',content:''})      //formdata ch sara store hoggya
  const [content,setContent] = useState('')
  const [error, setError] = useState({title:'',content:'',category:'',image:''}) // response from backend
  const [response, setResponse] = useState({response:'',color:''})
  const [category, setCategory] = useState([])  
  const[image,setImage]=useState(false)      //image chnge hon di k nai ohde lyi eh state bnaa ti
  const [tmpimage,setTmpImage] = useState("")

  const getCategory=()=>{                         //eh sari imformation mill gyi user di
    axios.get("http://localhost:3000/category")
    .then((res)=>{setCategory(res.data)})
    .catch((err)=>{console.log(err)})
  }
  const getArticle=()=>{
    axios.get("http://localhost:3000/article/"+id)
    .then((res)=>{setFormData(res.data)}) 
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{           //jo id aayi ohdi detail so ehde ch do km kite
   getCategory();
   getArticle()
  },[id,response]) 

  let isError=()=>{
    setError({})
    let e={}
    if (!formdata.title.trim())
      e.title='Article Title is required'
    if (!formdata.category.trim())
      e.category='Choose Category'
    if(image){
      let ext=tmpimage.name.split('.')[1]
    if(ext!='jpg' && ext!='png' && ext!='jpeg')
      e.image='Only jpg, png, jpeg are allowed'
  }
    setError(e)
    return Object.keys(e).length>0?true:false      //if error then true otherwise false
  }
  
  let handleSubmit=(e)=>{
    e.preventDefault()
    setResponse({})
    let url="http://localhost:3000/article"
    if(!isError()){
      axios.put(url+"/"+id,{title:formdata.title,category:formdata.category,content:formdata.content}) // data update
      .then((res)=>{ 
        if(image){  //image update kroni k nai
          const data=new FormData();
          data.append("image",tmpimage);
          axios.patch(url+"/image/"+id,data)
          .then((res)=>{
            if(res.data.status==1){
              setResponse({response:res.data.Response,color:'success'})
              setImage(false)     //chnge hoya k nai ta false true lgaane
              setTimeout(()=>navigate('/list'),3000)
            }
          })
          .catch((err)=>{console.log(err)})
        }
        else{
          if(res.data.status==1)
            setResponse({response:res.data.Response,color:'success'})
        }})
        .catch((err)=>{console.log(err)}) 
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
        <Editor text={formdata.content} setContent={setContent}/>
        {/* <textarea name="content" className='form-control' rows="7" onChange={(e)=>setFormData({...formdata,content:e.target.value})}></textarea> */}
      </div>
      <div className="col-4">
      <img src={formdata.image} alt="" className='w-75 m-auto d-block mg-3 py-4' height={250} />
        <label>Category :</label>
        <select name="category" className='form-select' value={formdata.category} onChange={(e)=>setFormData({...formdata,category:e.target.value})}>
        {category.map((row,index)=>
        <option key={index} value={row.category} >{row.category}</option>
        )}
        </select>
        <p className='text-danger small p-0 m-0'>{error.category}</p> <br/>
        <input type="file" name='image' className='form-control'  
        onChange={(e)=>{setTmpImage(e.target.files[0]);setImage(true)}}/>
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

export default Update