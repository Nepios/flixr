var express = require("express");
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var request = require('request');
var resultCtrl = require("./controllers/results");

app.set("view engine", 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));



app.get("/", function(req,res){
  res.render("index.ejs");
});
app.use("/results", resultCtrl);

app.listen(3000);