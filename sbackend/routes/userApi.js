const express = require('express')
var router = express.Router()   
const img = require('./file_upload')
const mail= require('./mailer')
const sq = require('./../connect')
const bcrypt = require('bcrypt');
const saltRounds = 10;

require('dotenv').config()
 
//routes
//all users
router.get('/', (req, res) => {
    sq.conn.query('select * from user', (error, results)=> {
        if (error) throw error;
             res.send(results)
      });
})
//get by id [user profile view]
router.get('/', (req, res) => {
    let id=req.params.id
    let q=`select * from user where Id=${id}`;
    sq.conn.query(q, (error, results)=> {
        if (error) throw error;
             res.send(results)
      });
    })

//deleteAll
router.delete('/' , (req,res) => {
    let q=`Delete from user `;
    sq.conn.query(q, (error, results)=> {
      console.log(results);
      
      if (error) { console.log(error);
        res.send({'status':0,'Response':'Error in Deleting Record'})}
      else
           res.send({'status':1,'Response':'Record Deleted'})
    });
      
  })


//register (signup) create user 
router.post('/',async(req, res) => { 
    let b=req.body
    let q1=`SELECT * from user where email='${b.email}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
            res.send({'status':0,'Response':'Account Already Exist'})
        }else
        {       
        let pw=await bcrypt.hash(b.password, saltRounds)
        let q=`INSERT INTO user (name,email,password) values ('${b.name}','${b.email}','${pw}')`;
       sq.conn.query(q,(error, results) => {
         console.log(results)
         if (error) 
           res.send({'status':0,'Response':'Error In Insertion'})
           else{
               let msg=`<h4>Hello ${b.name}</h4><p>Your Account is Created Succesfully</p>
               <p>Regards</p><p>WritersBlog</p>`;
               let data={rcvr:b.email,sub:"Welcome to WritersBlog",body:msg}
               mail.main(data).catch(console.error);    
               res.send({'status':1,'Response':'Record Saved'})  
           }
         })
         }
    });
})

//login
router.post('/login',async(req, res) => {
    let b=req.body;
    let q1=`SELECT * from user where email='${b.email}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
            let match=await bcrypt.compare(b.password,results[0].password)
            if(match){
                res.send({'Response':'Login Successful', userid:results[0].Id,status:1})
            }else{
                res.send({'Response':'Incorrect Password',status:0});
            }
        }else{
            res.send({'Response':'Incorrect Email',status:0});
        }
})
})

//change password
router.put('/password/:id',async (req, res) => {
    let b=req.body;
    let id=req.params.id;
    let q1=`SELECT * from user where id='${id}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
            let match=await bcrypt.compare(b.old_password,results[0].password)
            if(match){
                let pw=await bcrypt.hash(b.password, saltRounds)
                let q=`update user set password="${pw}" where Id='${id}'`;
                sq.conn.query(q,(error, results) => {
                    if (error)
                        res.send({'Response':"Error in Record Updating",status:0})
                    else
                        res.send({'Response':"Password Updated",status:1})
                })
            }else{
                res.send({'Response':'Response Old Password',status:0});
            }}
})
})

//profileimage
router.put('/image/:id',img.upload.single('image'), (req, res) => {
    let img="localhost:3000/public/"+req.file.filename;
    let id=req.params.id;
    let q=`update user set image="${img}" where Id='${id}'`;
    sq.conn.query(q,(error, results) => {
        if (error)
            res.send({"Response":"Error in Record Updating",status:0})
        else
            res.send({"Response":"Profile Image Updated",status:1})
    })
})

//forgot
router.post('/forgot',async (req, res) => {
    let email=req.body.email;
    let code = Math.floor(Math.random() * (9999 - 1111) + 1111);
    let q1=`SELECT * from user where email='${email}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
        let msg=`<h4></h4><p>We've received a request to reset your password for your account.</p>
        <p>To verify your identity and proceed with the password reset, please enter the following 
        One-Time Password (OTP) into the designated field on our password reset page:</p>
        <p><b>OTP:${code}</b></p>
        <p>Regards</p><p>WritersBlog</p>`;
        let data={rcvr:email,sub:"Reset Your Password",body:msg}
        mail.main(data).catch(console.error);            
        res.send({'Response':'Mail Sent','code':code,'status':1})
        }else
        {       
            res.send({'status':0,'Response':'Account Not Exist'})
        }
})
})

//reset
router.put('/resetpassword/',async (req, res) => {
    let password=req.body.password;
    let email=req.body.email;

    let pw=await bcrypt.hash(password, saltRounds)
    let q=u`pdate user set password="${pw}" where email='${email}'`;
    sq.conn.query(q,(error, results) => {
        if (error)
            res.send({"Response":"Error in Record Updating",status:0})
        else
            res.send({"Response":"Password Reset",status:1})
    })
})

//update profile
router.put('/:id', (req, res) => {
    let b=req.body;
    let id=req.params.id;
 
        let q=`update user set name="${b.name}",phone="${b.phone}",gender="${b.gender}",
        dob="${b.dob}",city="${b.city}",bio="${b.bio}"  where Id='${id}'`;
        sq.conn.query(q,(error, results) => {
            if (error)
                res.send({"Response":"Error in Record Updating",status:0})
            else
                res.send({"Response":"Profile Updated",status:1})
        })
    })
   
module.exports = router;
