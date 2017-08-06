'use strict';

const Hapi = require('Hapi');
const mysql = require('mysql');
const connection = require('./hapidb.js');

//connection.query()
const server = new Hapi.Server();
server.connection({host: 'localhost', port: 3100});

//deletion process
server.route({
    method: 'GET',
    path: '/delete',
    
    handler: function(request, reply){
      
      console.log(request.query);  

      connection.query(`DELETE FROM product_insert WHERE ?`,request.query,function(err,result){
          if(err){
              console.log(err); 
          }else{
              console.log(result);
          }
      })
      
    }
});


 
server.route({
    method: 'GET',
    path: '/update',
    handler: function(request, reply){
  
      console.log(request.query);  
      var product_name = request.query['product_name'];
      var product_code = parseInt(request.query['product_code']);
      var product_price = request.query['product_price'];
      var product_gst = request.query['product_gst'];
        if(product_name !== ""){
            connection.query(`UPDATE product_insert SET product_name = ? WHERE product_code = ?`,[product_name, product_code],function(err,result){
            if(err){
                console.log(err); 
            }else{
                console.log(result);
            }
         })
        }
        
        if(product_price !== ""){
            connection.query(`UPDATE product_insert SET product_price = ? WHERE product_code=?`,[product_price, product_code],function(err,result){
            if(err){
                console.log(err); 
            }else{
                console.log(result);
            }
         })
        }

        if(product_gst !== ""){
            connection.query(`UPDATE product_insert SET product_gst = ? WHERE product_code=?`,[product_gst, product_code],function(err,result){
            if(err){
                console.log(err); 
            }else{
                console.log(result);
            }
         })
        }
        reply("EDIDED SUCCESSFULLY");
            }
})

//fetching data
server.route({
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    },
    method: 'POST',
    path: '/productdetailstofetch',
    handler: function(request, reply){

      connection.query(`SELECT * FROM product_insert`,request.query,function(err,result){
          if(err){
              console.log(err); 
          }else{
             reply(result);
          }
      })

    }
});

//insertion
server.route({
    method: 'GET',
    path: '/connect',
    handler: function(request, reply){
      
        console.log(request.query);  

      connection.query(`INSERT INTO product_insert SET ?`,request.query,function(err,result){
          if(err){
              console.log(err); 
          }else{
              console.log(result);
          }
      })
      
        reply("INSERTED SUCCESSFULLY");
            }
});

server.route({
    method: 'GET',
    path: '/search',
    handler: function(request, reply){
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
