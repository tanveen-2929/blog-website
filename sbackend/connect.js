var mysql      = require('mysql');
module.exports.conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tania_2929',
  database : 'blogdb',
  port     :3308
});

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
   
//     console.log('connected as id ' + connection.threadId);
//   });
 
// connection.connect();
 
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
 
// connection.end();