const mongoose = require('mongoose');   

const articleSchema = new mongoose.Schema({      //first model create
    title: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    content: {type: String, required: true},
    user: {type: String, required: true},

    date: {type: Date,default:Date.now()},
    publish: {type: Boolean, default: false}
  });

module.exports = mongoose.model('Article', articleSchema,'Article'); 