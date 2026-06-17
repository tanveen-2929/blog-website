const express = require('express')
var router = express.Router()   
const mongoose = require('mongoose');   //import
const Admin = require('../models/admin')
const bcrypt = require('bcrypt');
const saltRounds = 10;


require('dotenv').config()
conn().catch(err => console.log(err)); //connection
async function conn() {
await mongoose.connect(process.env.DBCONNECT);
}

router.get('/', (req, res) => {
// res.send('Find / Select /Retrive')
Admin.find().sort({_id:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})


//register
router.post('/', async(req, res) => {
    let b=req.body;
    let admin=await Admin.findOne({email:b.email})
    if(!admin){
        let pw=await bcrypt.hash(b.password,saltRounds)
        let data={email:b.email,password:pw}
        const rec=new Admin(data);
        rec.save()
        .then(()=>res.send({'Response':'Record Saved',status:1}))
        .catch(err => { console.log(err); res.send({'status':0,'Response':'Error In Insertion'})})
    }
    else
    res.send({'status':0,'Response':'Account Already Exist'})
})

//login
router.post('/login',async (req, res) => {
    let b=req.body;
    let admin=await Admin.findOne({email:b.email})
    if(admin){
    let match=await bcrypt.compare(b.password,admin.password)
    if(match)
        res.send({'Response':'Login Successful', adminid:admin._id,status:1})
    else
    res.send({'Response':'Incorrect Password',status:0});
    }
    else
    res.send({'Response':'Incorrect Email',status:0});
})

//deleteAll
router.delete('/' , (req,res) => {
    Admin.deleteMany({})
    .then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
    .catch(err => res.send({'status':0,'Response':'Error in Deleting Record'}))
})

module.exports = router;
