var express = require("express");
var router = express.Router();
var app = express();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));
var http = require('http').Server(router);
var io = require('socket.io')(http);

router.get('/', function(req, res){
  io.on('connect', function(socket) {
  console.log("user connected");
  res.render('chat');

});
});




module.exports = router;