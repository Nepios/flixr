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
	db.user.findById(req.user.id).then(function(user) {
		db.show.findOrCreate({
			where: {title: req.body.title},
			defaults: {
				guideboxId: req.body.guideboxId,
				image: req.body.image
			}
		}).spread(function(show, created){
			user.addShow(show, {favorite: true});
		});
	});
	res.send("favorite post");
});


module.exports = router;