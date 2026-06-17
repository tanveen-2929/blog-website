var express = require('express')  //express import kita a
var router = express.Router()   //new router create kita
const mongoose = require('mongoose');   //Import Mongoose for MongoDB interaction
const Comment = require('../models/comment') //Import the Comment model
require('dotenv').config() // Load environment variables from .env file

conn().catch(err => console.log(err)); //Establish a connection to the database
async function conn() {
await mongoose.connect(process.env.DBCONNECT);
}

router.get('/:article', (req, res) =>{
    Comment.find({article:req.params.article}).sort({_id:-1}) //jehre article di id aau ohde comment hi show hon ge eh assi filter krta a
    .then((data)=>res.send(data))
    .catch(err => res.send({"Error":"Error in record fetching"}))
})

router.post('/', (req, res) => {
    let b=req.body
    let data={name: b.name ,email:b.email,comment:b.comment,article: b.article}
    const rec = new Comment(data);
    rec.save()
    .then(()=>res.send({'status':1,'Response':'Comment Create Succesfully'}))
    .catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Comment'})})
})

router.delete('/:article', (req, res) => {
Comment.deleteOne({_article:req.params.article})
.then((data)=>res.send({'status':1,'Response':'comment Deleted'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Deleting comment'})})
})

router.delete('/' , (req,res) => {
    Comment.deleteMany({})
    .then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
    .catch(err => res.send({'status':0,'Response':'Error in Deleting comment'}))
})

module.exports = router;
