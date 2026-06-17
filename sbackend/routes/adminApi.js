const express = require('express')
var router = express.Router()  
const sq = require('./../connect')
const bcrypt = require('bcrypt'); 
const saltRounds = 10;
require('dotenv').config()
 
router.get('/', (req, res) => {
    sq.conn.query('select * from admin', (error, results)=> {
        if (error) throw error;
             res.send(results)
      });
})


//register
router.post('/', async(req, res) => {
    let b=req.body
    let q1=`SELECT * from admin where email='${b.email}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
            res.send({'status':0,'Response':'Account Already Exist'})
        }else
        {       
        let pw=await bcrypt.hash(b.password, saltRounds)
        let q=`INSERT INTO admin (email,password) values ('${b.email}','${pw}')`;
       sq.conn.query(q,(error, results) => {
         console.log(results)
         if (error) 
           res.send({'status':0,'Response':'Error In Insertion'})
           else{
            res.send({'Response':'Record Saved',status:1});

           }
         })}
    })
})


//login
router.post('/login',async (req, res) => {
    let b=req.body;
    let q1=`SELECT * from admin where email='${b.email}'`;
    sq.conn.query(q1, async(error, results) =>{
        if (results.length>0){
            let match=await bcrypt.compare(b.password,results[0].password)
            if(match){
                res.send({'Response':'Login Successful', adminid:results[0].Id,status:1})
            }else{
                res.send({'Response':'Incorrect Password',status:0});
            }
        }else{
            res.send({'Response':'Incorrect Email',status:0});
        }
})
})

//deleteAll
router.delete('/' , (req,res) => {
    let q=`Delete from admin `;
    sq.conn.query(q, (error, results)=> {
      console.log(results);
      if (error) 
        res.send({'status':0,'Response':'Error in Deleting Record'})
      else
           res.send({'status':1,'Response':'Record Deleted'})
    });
      
  })

module.exports = router;
