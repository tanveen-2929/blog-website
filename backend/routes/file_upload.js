const path = require('path')    //multer storage da program run krn lyi path define krna jroori a
const multer  = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage,
    fileFilter: function (req, file, callback) {
      
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024 * 4
  }
   })
  
module.exports.upload=upload   