import React, { useState , useEffect} from 'react'
import axios from 'axios'
import PImage from './../../assets/user.png'

const Avatar = () => {
  const userid=localStorage.getItem('userid')
  let url="http://localhost:3000/user/"
  const [image,setImage] = useState("")
  const [tmpimage,setTmpImage] = useState("")

  const [error, setError] = useState({image:''})
  const [response, setResponse] = useState({response:'',color:''})
  let isError=()=>{
    setError({})
    let ext=tmpimage.name.split('.')[1]  
    let e={}
    if(ext!='jpg' && ext!='png' && ext!='jpeg')
      e.image='Only jpg, png, jpeg are allowed'
    setError(e)
    return Object.keys(e).length>0?true:false     
  }
  useEffect(()=>{
    axios.get(url+userid)
    .then((res)=>{
      if(res.data.image)
        setImage(res.data.image)
      else
      setImage(PImage)
      })
    .catch((err)=>{console.log(err)})
  },[response])

  let handleSubmit=(e)=>{ 
    e.preventDefault()
    setResponse({})
    if(!isError()){
      const data=new FormData();
      data.append('image',tmpimage);
    axios.put(url+"/image/"+userid,data)
    .then((res)=>{ 
      if(res.data.status==1){
        setResponse({response:res.data.Response,color:'success'})
      }
      else
      setResponse({response:res.data.Response,color:'danger'})
  })
    .catch((err)=>console.log(err))
  }
  }

  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)} className=' pt-5'>
<div className="row">
  <div className="col-4 text-center">
    <img src={image} alt="" width={"200px"} height={"200px"} className='border p-2'/>
  </div>
  <div className="col-4 pt-3">
    <label>Select Profile Image</label>
    <input type="file" name="image" className='form-control mt-3'  onChange={(e)=>setTmpImage(e.target.files[0])} /><br />
    <button type='submit' className='btn btn-outline-dark mb-3 w-100'>Update Image</button>
    <div className={'mt-4 alert alert-'+response.color}>{response.response}</div>
  </div>
  </div> 
  </form>   
    </>
  )
}

export default Avatar