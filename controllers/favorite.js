var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
	res.send("favorite");
});

router.post('/', function(req, res){
	console.log(req.body.title);
	console.log(req.body.guideboxId);
	console.log(req.body.image);
	console.log(req.user);
	res.send("favorite post");
});


module.exports = router;