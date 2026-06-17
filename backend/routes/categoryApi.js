const express = require('express')
var router = express.Router()   //new router create kita
const mongoose = require('mongoose');   //Import Mongoose for MongoDB interaction
const Category = require('../models/category') //Import the Category model

require('dotenv').config() // Load environment variables from .env file
conn().catch(err => console.log(err)); //Establish a connection to the database
async function conn() {
await mongoose.connect(process.env.DBCONNECT);
}

 
router.get('/', (req, res) => {
Category.find().sort({_id:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})

router.post('/', (req, res) => {
    let b=req.body
    let data={category: b.category ,icon:b.icon,short_des:b.short_des}
    const rec = new Category(data);
    rec.save()
    .then(()=>res.send({'status':1,'Response':'Category Create Succesfully'}))
    .catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Insertion'})})
})

router.put('/:id', (req, res) => {
let b=req.body;
let data={category: b.category ,icon:b.icon,short_des:b.short_des}
Category.updateOne({_id:req.params.id},data)
.then((data)=>res.send({'status':1,'Response':'Record Updated'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Updating Insertion'})})
})

router.delete('/:id', (req, res) => {
Category.deleteOne({_id:req.params.id})
.then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Deleting Record'})})
})

//deleteAll
router.delete('/' , (req,res) => {
    Category.deleteMany({})
    .then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
    .catch(err => res.send({'status':0,'Response':'Error in Deleting Record'}))
})

module.exports = router;
