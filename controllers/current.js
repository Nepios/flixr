var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
	res.send("current");
});
router.post('/', function(req, res){
	res.send("post current");
});

module.exports = router;