"use strict";

var express = require("express");
var mongo = require("mongodb").MongoClient;

var googleImages = require("google-images");
var client = googleImages("004128940164975221266:ndq9pbvvrx0", "AIzaSyDcH5p0Csu8q-lQSsxffhNILZuUUiMPpes");

var app = express();

mongo.connect(process.env.MONGOLAB_URI, function(err,db) {
  
  if (err) { throw err; }
  
  db.createCollection("record", { capped : true, size : 5242880, max : 5000 } );
  
  app.use("/public", express.static(process.cwd() + "/public"));
  app.use("/scripts", express.static(process.cwd() + "/scripts"));
  
  app.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/public/index.html");
  });
  
  app.get("/api/:search", function(req, res) {
    
    var query = req.params.search;
    var date = new Date();
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    db.collection("record").insert(
      {
        search : query,
        date :  month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear()
      }    
    , function(err, records) {
      if (err) {throw err; }
      
      console.log("Document added!");
    });
    
    client.search(query).then(function(images) {
      res.json(images);
    });
  });
  
  app.get("/api/:search/:page", function(req, res) {
    var query = req.params.search;
    var num = req.params.page;
      
    client.search(query, {page : num} ).then(function(images) {
      res.json(images);
    });
  });
  
  app.get("/recent", function(req, res) {
    db.collection("record").find().limit(20).toArray(function(err, results) {
      if (err) { throw err; }
      res.json(results);
    });

    
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Node listening on port");
});