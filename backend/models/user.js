const mongoose = require('mongoose');   //mongoose library nu import kr rhe aa jo jroori aa schema nu define krn lyi te mongoDB nal interact krn lyi

const userSchema = new mongoose.Schema({      //first model create  //new schema create kita a
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, default: null},
    gender: {type: String, default: null},
    dob: {type: String, default: null},
    city: {type: String, default: null},
    bio: {type: String, default: null},
    image: {type: String, default: null},
    date: {type: Date,default:Date.now()}
  });

module.exports = mongoose.model('User', userSchema,'User');  
//model nu export kr rhe aa jo aage further CRUD operation lyi use hona aa te first argument is name of model, the second is the schema, and the third is the name of the collection in the database.