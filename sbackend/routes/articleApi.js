const express = require('express')
var router = express.Router()   
const img = require('./file_upload')
const sq = require('./../connect')
const mail = require('./mailer')
require('dotenv').config()

//all
router.get('/', (req, res) => {
    sq.conn.query('select * from article', (error, results)=> {
        if (error) throw error;
             res.send(results)
      });
})
//recent
router.get('/recent', (req, res) => {
    let q='select * from article where publish=1 order by date DESC limit 6'
    sq.conn.query(q, (error, results)=> {
        if (error) throw error;
             res.send(results)
      });
}) 
//full article
router.get('/:id', (req, res) => {
let id=req.params.id
let q=`select * from article where Id=${id}`;
sq.conn.query(q, (error, results)=> {
    if (error) throw error;
         res.send(results)
  });

})
//by category
router.get('/category/:cid', (req, res) => {
let cid=req.params.cid
let q=`select * from article where publish=1 and category=${cid} order by date desc`;
sq.conn.query(q, (error, results)=> {
    if (error) throw error;
         res.send(results)
  });

})
//by user
router.get('/user/:uid', (req, res) => {
let uid=req.params.uid
let q=`select * from article where user=${uid} order by date desc`;
sq.conn.query(q, (error, results)=> {
    if (error) throw error;
         res.send(results)
  });

})


router.post('/',img.upload.single('image'), (req, res) => {
let b=req.body
let image="localhost:3000/public/"+req.file.filename;
  let q=`INSERT INTO article(title,category,image,content,user) values('${ b.title}','${ b.category}','${b.image}','${b.content}','${ b.user}')`;
  sq.conn.query(q, (error, results)=> {
    console.log(results);
    if (error) { console.log(error);
    
        res.send({'status':0,'Response':'Error in  Insertion'})}
      else
           res.send({'status':1,'Response':'Record inserted'})
  });
})


router.patch('/image/:id',img.upload.single('image'), (req, res) => {
let image="localhost:3000/public/"+req.file.filename;
let id= req.params.id
let q=`Update article set image='${image}' where Id=${id}`;
      sq.conn.query(q, (error, results)=> {
        console.log(results);
        if (error) 
          res.send({'status':0,'Response':'Error in image Updating '})
        else
             res.send({'status':1,'Response':'Image Updated'})
      });
})

router.patch('/:id', (req, res) => {
let status=req.body.status;
let id= req.params.id
let q=`Update article set publish='${status}' where Id=${id}`;
      sq.conn.query(q, (error, results)=> {
        console.log(results);
        if (error) 
          res.send({'status':0,'Response':'Error in status Updating '})
        else
             res.send({'status':1,'Response':'status Updated'})
      });

})    

    
router.put('/:id', (req, res) => {
    let b=req.body;
    let id=req.params.id;
    let q=`Update article set title='${ b.title}',category='${b.category}',content='${b.content}' where Id=${id}`;
      sq.conn.query(q, (error, results)=> {
        console.log(results);
        if (error) 
          res.send({'status':0,'Response':'Error in Updating Insertion'})
        else
             res.send({'status':1,'Response':'Record Updated'})
      });
})

router.delete('/:id', (req, res) => {
    let id=req.params.id;
  let q=`Delete from article where Id=${id}`;
  sq.conn.query(q, (error, results)=> {
    console.log(results);
    if (error) 
      res.send({'status':0,'Response':'Error in Deleting Record'})
    else
         res.send({'status':1,'Response':'Record Deleted'})
  });
    
})

//deleteAll
router.delete('/' , (req,res) => {
    let q=`Delete from article`;
    sq.conn.query(q, (error, results)=> {
        console.log(results);
      if (error) 
        res.send({'status':0,'Response':'Error in Deleting Record'})
      else
           res.send({'status':1,'Response':'Record Deleted'})
    });
        
})
module.exports = router;