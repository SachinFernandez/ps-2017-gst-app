
'use strict';

const Hapi = require('Hapi');
const mysql = require('mysql');
const connection = require('./hapidb.js');


const server = new Hapi.Server();
server.connection({host: 'localhost', port: 5000});// search 5000port
server.route({
    method: 'GET',
    path: '/searchdb',
    handler: function(request, reply){
      //  console.log(request.query);
   //  var product_name = request.query['product_name'];
      var product_code = parseInt(request.query['product_code']);
      console.log(request.query);  
         if(product_code !=="")
            {
      connection.query(`SELECT * FROM product_insert WHERE product_code=?`,[product_code],request.query,function(err,result){
          if(err){
              console.log(err); 
          }else{
              console.log(result);
          }
      })
            }
      
        reply("hello");
            }
});



server.start();