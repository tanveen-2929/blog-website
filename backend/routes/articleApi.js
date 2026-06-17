const express = require('express')
var router = express.Router()   
const mongoose = require('mongoose');   //import
const Article = require('../models/article')
const img = require('./file_upload')
const mail = require('./mailer')

require('dotenv').config()
conn().catch(err => console.log(err)); //connection
async function conn() {
await mongoose.connect(process.env.DBCONNECT);
}

//all
router.get('/', (req, res) => {
Article.find().sort({date:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})
//recent
router.get('/recent', (req, res) => {
Article.find({publish:true}).sort({date:-1}).limit(6)
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})
//full article
router.get('/:id', (req, res) => {
let id=req.params.id
Article.findOne({_id:id})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})
//by category
router.get('/category/:cat', (req, res) => {
let cat=req.params.cat
Article.find({category:cat,publish:true}).sort({date:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})
//by user
router.get('/user/:uid', (req, res) => {
let uid=req.params.uid
Article.find({user:uid}).sort({date:-1})
.then((data)=>res.send(data))
.catch(err => res.send({"Error":"Error in data fetching"}))
})



router.post('/',img.upload.single('image'), (req, res) => {
let b=req.body
let image="http://localhost:3000/public/"+req.file.filename;
let data={title: b.title ,category:b.category,image:image,content:b.content,user:b.user}
const rec = new Article(data);
rec.save()
.then(()=>{
let msg=`<p> Article with ${b.title} Posted By User (${b.user}) at ${Date.now()}</p>`; //mailing add kiti aa ehde nl jdo user koi article pauu ga te admin nu msg aaye gaa ki new article upload hoya aa as aa notification
let data={rcvr:"tanveenk66@gmail.com", sub:"New Article Entry",body:msg}
mail.main(data).catch(console.error);
res.send({'status':1,'Response':'Record inserted'})})
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in  Insertion'})})
})


router.patch('/image/:id',img.upload.single('image'), (req, res) => {
let image="http://localhost:3000/public/"+req.file.filename;
let id= req.params.id
Article.updateOne({_id:id},{image:image})
.then((data)=>res.send({'status':1,'Response':'Image Updated'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in image Updating '})})
})

router.patch('/:id', (req, res) => {
let status=req.body.status;
let id= req.params.id
Article.updateOne({_id:id},{publish:status})
.then((data)=>res.send({'status':1,'Response':'status Updated'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in status Updating '})})
})    

    
router.put('/:id', (req, res) => {
let b=req.body;
let data={title: b.title ,category:b.category,content:b.content}
Article.updateOne({_id:req.params.id},data)
.then((data)=>res.send({'status':1,'Response':'Record Updated'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Updating Insertion'})})
})

router.delete('/:id', (req, res) => {
Article.deleteOne({_id:req.params.id})
.then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
.catch(err => { console.log(err); res.send({'status':0,'Response':'Error in Deleting Record'})})
})

//deleteAll
router.delete('/' , (req,res) => {
    Article.deleteMany({})
    .then((data)=>res.send({'status':1,'Response':'Record Deleted'}))
    .catch(err => res.send({'status':0,'Response':'Error in Deleting Record'}))
})
module.exports = router;
