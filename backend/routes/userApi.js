const express = require('express')
var router = express.Router()   
const mongoose = require('mongoose');   //import
const User = require('../models/user')
const img = require('./file_upload')
const mail= require('./mailer')
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config()
conn().catch(err => console.log(err)); //connection
async function conn() {
await mongoose.connect(process.env.DBCONNECT);
}

//routes
//all users
router.get('/', (req, res) => {
// res.send('Find / Select /Retrive')
User.find().sort({_id:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})
//get by id [user profile view]
router.get('/:id', (req, res) => {
    let id=req.params.id;
    User.findOne({_id:id})
    .then((data)=>res.send(data))
    .catch(err => res.send({"Error":"Error in data fetching"}))
    })

//deleteAll
router.delete('/' , (req,res) => {
    User.deleteMany({})
    .then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
    .catch(err => res.send({'status':0,'Response':'Error in Deleting Record'}))
})

//register
router.post('/', async(req, res) => {
    let b=req.body;
    let user=await User.findOne({email:b.email})
    if(!user){ 
        let pw=await bcrypt.hash(b.password,saltRounds)
        let data={name:b.name,email:b.email,password:pw}
        const rec=new User(data);
        rec.save()
        .then(()=>{
            let msg=`<h4> Hello ${b.name}</h4><p> Your Account is Created Successfully</p>,<p>Regards</p><p>WriterBlog</p>`;
            let data={rcvr:b.email,sub:"WElcome to WriterBlog",body:msg}
            mail.main(data).catch(console.error);
            res.send({'status':1,'Response':'Record Saved'})
        })
        .catch(err => { console.log(err); res.send({'status':0,'Response':'Error In Insertion'})})
    }
    else
    res.send({'status':0,'Response':'Account Already Exist'});
})

//login
router.post('/login',async (req, res) => {
    let b=req.body;
    let user=await User.findOne({email:b.email})
    if(user){
    let match=await bcrypt.compare(b.password,user.password)
    if(match)
    res.send({'Response':'Login Successful', userid:user._id,status:1})
    else
    res.send({'Response':'Incorrect Password',status:0});
    }
    else
    res.send({'Response':'Incorrect Email',status:0});
})


//change password
router.put('/password/:id',async (req,res) =>{
    let b=req.body;
    let id=req.params.id;
    let user=await User.findOne({_id:id})
    if(user){
        let match=await bcrypt.compare(b.old_password,user.password)
        if(match){
        let pw=await bcrypt.hash(b.password,saltRounds)
        let data={password:pw}
        User.updateOne({_id:id},data)
        .then((data)=>res.send({'Response':"Password Updated",status:1}))
        .catch(err => { console.log(err); res.send({'Response':"Error in Record Updating",status:0})})
        }
        else
        res.send({'Response':'Incorrect Old Password',status:0});
        }
})

//profile image
router.put('/image/:id',img.upload.single('image'), (req, res) => {
    let img="http://localhost:3000/public/"+req.file.filename;
    let id=req.params.id;
    let data={image:img}
    User.updateOne({_id:id},data)
    .then((data)=>res.send({"Response":"Profile Image Updated",status:1}))
    .catch(err => { console.log(err); res.send({"Response":"Error in Record Updating",status:0})})
})

//forgot
router.post('/forgot',async (req, res) => {
    let email=req.body.email;
    let user=await User.findOne({email:email})  
    if(user){
    let code = Math.floor(Math.random() * (9999 - 1111) + 1111);
    let msg=`<h4></h4><p>We've received a request to reset your password for your account.</p>
    <p>To verify your identity and proceed with the password reset, please enter the following 
    One-Time Password (OTP) into the designated field on our password reset page:</p>
    <p><b>OTP:${code}</b></p>
    <p>Regards</p><p>WritersBlog</p>`;
    let data={rcvr:email,sub:"Reset Your Password",body:msg}
    mail.main(data).catch(console.error);            
    res.send({'Response':'Mail Sent','code':code,'status':1})
    }
    else{
        res.send({'status':0,'Response':'Account Not Exist'});   
    }
})

//reset
router.put('/resetpassword',async (req, res) => {
    let password=req.body.password;
    let email=req.body.email;
    let pw=await bcrypt.hash(password, saltRounds)
    let data={password:pw}
    User.updateOne({email:email},data)
    .then((data)=> res.send({"Response":"Password Reset",status:1}))
    .catch((err)=>res.send({"Response":"Error in Record Updating",status:0}))        
})

//update profile
router.put('/:id', (req, res) => {
    let b=req.body;
    let id=req.params.id;
    let data={
       name:b.name,phone: b.phone ,gender:b.gender,dob:b.dob,city:b.city,bio:b.bio }
   User.updateOne({_id:id},data)
   .then((data)=>res.send({"Response":"Profile Updated",status:1}))
   .catch(err => { console.log(err); res.send({"Response":"Error in Record Updating",status:0})})
   })
   

module.exports = router;
