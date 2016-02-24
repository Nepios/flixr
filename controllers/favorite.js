var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
	 db.user.find({
    where: {
      id: req.user.id},
      include: [db.show]
      }).then(function(user) {
        res.render('favorite', {user: user});
    });
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
      res.redirect('/');
		});
	});
});




module.exports = router;