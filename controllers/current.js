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
        res.render('current', {user: user});
    });
  });

router.post('/', function(req, res){
  if (req.user){
  	db.user.findById(req.user.id).then(function(user) {
  		db.show.findOrCreate({
  			where: {title: req.body.title},
  			defaults: {
  				guideboxId: req.body.guideboxId,
  				image: req.body.image
  			}
  		}).spread(function(show, created){
  			user.addShow(show, {current: true});
        res.redirect('/');
  		});
  	});
  } else {
    res.redirect('/auth/login');
  }
});

router.post('/delete', function (req, res) {
  db.show.findOne({where: {guideboxId: req.body.guideboxId}}).then(function(show){
    db.usersShows.findOne({where: {userId: req.user.id, showId: show.id}}).then(function(row){
      row.current = false;
      row.save().then (function(){
        res.redirect('/current');
      });
    });
  })
});

module.exports = router;