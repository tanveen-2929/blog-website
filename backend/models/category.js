const mongoose = require('mongoose');   

const categorySchema = new mongoose.Schema({      //first model create
    category: {type: String, required: true},
    icon: {type: String, required: true},
    short_des: {type: String, required: true},
  });

module.exports = mongoose.model('Category', categorySchema,'Category'); 