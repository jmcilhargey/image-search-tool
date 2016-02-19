var express = require("express");
var mongo = require("mongodb").MongoClient;

var googleImages = require("google-images");
var client = googleImages("004128940164975221266:ndq9pbvvrx0", "AIzaSyDcH5p0Csu8q-lQSsxffhNILZuUUiMPpes");

var app = express();

app.use(express.static(__dirname));
app.use(express.bodyParser());

app.post("/", function(req, res) {
  client.search(req.body.search).then(function(images) {
    res.json(images);
  });
});

app.listen(process.env.PORT, function() {
  console.log("Ready!");
});