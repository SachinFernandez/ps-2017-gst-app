const mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'sachin',
  database : 'productentry'
});
 
connection.connect(function(err,result){
    if(err){
        console.log(err);
    }else{
        console.log("connecting to db");
    }
})

module.exports = connection;
 