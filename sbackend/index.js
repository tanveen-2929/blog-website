const express = require('express')
const bodyParser = require('body-parser')
const sq = require('./connect')

const app = express()

require('dotenv').config()
const port = process.env.PORT

sq.conn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + sq.conn.threadId);
  });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Admin=require('./routes/adminApi')
const Category=require('./routes/categoryApi')
const Article=require('./routes/articleApi')
const User=require('./routes/userApi')

app.use('/admin',Admin)
app.use('/category',Category)
app.use('/article',Article)
app.use('/user',User)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})