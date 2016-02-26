var express = require('express');
var db = require('../models');
var router = express.Router();
var passport = require('passport');
var Materialize = require('materialize');

router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post('/signup', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  db.user.findOrCreate({
  	where: {
  		email: email
  	}, 
  	defaults: {
  		name: name,
  		password: password
  	}
  }).spread(function(user, created){
  	if (created) {
  		res.redirect('/auth/login');
  	} else {
  		res.send("User already exists");
  	}
  }).catch(function(err){
  	res.send(err);
  });

});

router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', function(req, res) {
	var email = req.body.email;
	var password = req.body.password;
  passport.authenticate('local', function(err, user, info) {
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        ('success', 'You are now logged in.');
        res.redirect('/');
      });
    } else {
      // Materialize.toast('Error', 4000);
      res.redirect('/auth/login');
    }
  })(req, res);
});

router.get('/login/:provider', function(req, res) {
  passport.authenticate(
    req.params.provider,
    {scope: ['public_profile', 'email']}
  )(req, res);
});

router.get('/callback/:provider', function(req, res) {
  passport.authenticate(req.params.provider, function(err, user, info) {
    if (err) throw err;
    if (user) {
      req.login(user, function(err) {
        if (err) throw err;
        // Materialize.toast('You logged in with ' + req.params.provider , 4000);
        res.redirect('/');
      });
    } else {
      // Materialize.toast(info.message, 4000);
      res.redirect('/auth/login');
    }
  })(req, res);
});

router.get('/logout', function(req, res) {
  // Materialize.toast('You have been logged out.', 4000);
  req.logout();
  res.redirect('/');
});


module.exports = router;