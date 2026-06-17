const express = require('express')
var router = express.Router()   
const sq = require('./../connect')
require('dotenv').config()

router.get('/', (req, res) => {
    sq.conn.query('select * from category', (error, results)=> {
          if (error) throw error;
               res.send(results)
        });
         
}) 

router.post('/', (req, res) => {
  let b=req.body
  let q=`INSERT INTO category(category,icon,short_des) values('${ b.category}','${b.icon}','${b.short_des}')`;
  sq.conn.query(q, (error, results)=> {
    console.log(results);
    if (error) { console.log(error);
      res.send({'status':0,'Response':'Error in Insertion'})}
    else
      res.send({'status':1,'Response':'Record inserted'})
  });
})

router.put('/:id', (req, res) => {
let b=req.body;
let id=req.params.id;
let q=`Update category set category='${ b.category}',icon='${b.icon}',short_des='${b.short_des}' where Id=${id}`;
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
  let q=`Delete from category where Id=${id}`;
  sq.conn.query(q, (error, results)=> {
    console.log(results);
    if (error) {console.log(error);
      res.send({'status':0,'Response':'Error in Deleting Record'})}
    else
      res.send({'status':1,'Response':'Record Deleted'})
  });
})

//deleteAll
router.delete('/' , (req,res) => {
  let q=`Delete from category `;
  sq.conn.query(q, (error, results)=> {
    console.log(results);
    
    if (error) 
      res.send({'status':0,'Response':'Error in Deleting Record'})
    else
         res.send({'status':1,'Response':'Record Deleted'})
  });
    
})

module.exports = router;
