"use strict";

var express = require("express");
var mongo = require("mongodb").MongoClient;

var googleImages = require("google-images");
var client = googleImages("004128940164975221266:ndq9pbvvrx0", "AIzaSyDcH5p0Csu8q-lQSsxffhNILZuUUiMPpes");

var app = express();

app.use("/public", express.static(process.cwd() + "/public"));
app.use("/scripts", express.static(process.cwd() + "/scripts"));

app.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

app.get("/api/:search", function(req, res) {
  var query = req.params.search;
  
  client.search(query).then(function(images) {
    res.json(images);
  });
});

app.listen(process.env.PORT, function() {
  console.log("Node listening on port");
});

/*
mongo.connect("mongodb://localhost:27017/photoapp", function(err, db) {
  if (err) {
    throw new Error("Database didn't connect!");
  } else {
    console.log("MongoDB connected!");
  }
  
  app.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/index.html");
  });
  
  function photoHandler(db) {
    var photos = db.collection("photos");
  };
  
  function newSearch() {
    console.log("Ftn ran!");
    var http = new XMLHttpRequest();
    var search = document.querySelector("input[name='search']").value;
    
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200) {
        document.getElementById("results").innerHTML = http.responseText;
      }
    }
    
    http.open("POST", url + "/api/photos", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send("fname=Henry&lname=Ford");
  };
  
  app.listen(process.env.PORT, function() {
    console.log("Ready!");
  });
  
});

/*
(function () {
    var newSearch = document.querySelector(".btn");
    var newResults = document.querySelector("#results");
    var formSearch = document.querySelector("form");
    var apiUrl = "http://localhost:3000/api/search"
    
    function ready(fn) {
      if (typeof fn !== "function") {
         return;
      }

      if (document.readyState === "complete") {
         return fn();
      }

      document.addEventListener("DOMContentLoaded", fn, false);
    }
  })();
  
  newSearch.addEventListener("click", function() {
    ajaxRequest("POST", apiUrl, displayPhotos);
  });
  
  function displayPhotos(data) {
    var resultsObject = JSON.parse(data);
    newResults.innerHTML = resultsObject.url;
  };
  
  function searchHandler(db) {
    var query = db.collection("search");
    
    this.getSearch = function(req, res) {
      query.find({}, function(err, result) {
        if (err) {
          throw err;
        }
        if (result) {
          res.json(result);
        }
      });
    }
  };
  
  function ajaxRequest(method, url, callback) {
    var xmlHttp = new XMLHttpRequest();
    
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.response);
    }
    
    xmlHttp.open(method, url, true);
    xmlHttp.send();
  };
  */