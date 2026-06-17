const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

var cors = require('cors')
app.use(cors({origin:'*'}))
app.use('/public', express.static(path.join(__dirname, 'public')))

require('dotenv').config()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Admin=require('./routes/adminApi')
const Category=require('./routes/categoryApi')
const Article=require('./routes/articleApi')
const User=require('./routes/userApi')
const Comment=require('./routes/commentApi')


app.use('/admin',Admin)
app.use('/category',Category)
app.use('/article',Article)
app.use('/user',User)
app.use('/comment',Comment)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})