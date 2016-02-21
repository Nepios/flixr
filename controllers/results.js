var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
	var searchTerm = req.query.title;
	console.log(searchTerm);
});


module.exports = router;