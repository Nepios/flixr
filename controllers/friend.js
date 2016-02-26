var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
  if (req.user.id){
    db.user.findById(req.user.id).then(function(user){
      user.getFriend().then(function(friends){
        res.render('friend', {friends:friends});
      });
    });
  } else {
    res.redirect('/auth/login');
  }
  });

router.post('/', function(req, res){
  console.log(req.user.id);
  if (req.user.id){
    db.user.findById(req.user.id).then(function(user){
      db.user.findById(req.body.id).then(function(friend){
        user.addFriend(friend);
        res.redirect('/');
      });
    });
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/:id', function(req, res){
  if (req.user.id){
    db.user.findById(req.user.id).then(function(user){
      db.user.findById(req.params.id).then(function(friend){
        user.removeFriend(friend);
        res.redirect('/');
      });
  });
  } else {
    res.redirect('/auth/login');
  }
});





module.exports = router;