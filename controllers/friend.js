var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
    db.user.find({where: {id: req.user.id}}).then(function(user){
      user.getFriend({include: db.shows}).then(function(friends){
        res.render('friend', {friends:friends});
      }).catch(function(err){
      res.render('404');
    });
    }).catch(function(err){
      res.render('404');
    });
});

router.post('/', function(req, res){
  if (req.user.id){
    db.user.findById(req.user.id).then(function(user){
      db.user.findById(req.body.id).then(function(friend){
        user.addFriend(friend);
        res.redirect('/friend');
      });
    }).catch(function(err){
      res.render('404');
      });
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/:id', function(req, res){
  if (req.user.id){
    db.user.findById(req.user.id).then(function(user){
      db.user.findById(req.params.id).then(function(friend){
        res.render('friendprofile', {friend: friend});
      });
    }).catch(function(err){
      res.render('404');
      });
  } else {
    res.redirect('/auth/login');
  }
});

router.delete('/:id', function(req, res){
  db.user.findById(req.user.id).then(function(user){
    if(req.params.id){
      db.user.findById(req.params.id).then(function(friend){
        user.removeFriend(friend).then(function() {
        res.send({msg: 'success'});
        });
      });
    } else {
      res.render('error');
    }
  }).catch(function(err) {
    res.send({msg: 'error'});
  });
});





module.exports = router;