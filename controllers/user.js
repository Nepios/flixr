var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
   db.user.findAll().then(function(user) {
        res.render('user', {user: user});
    });
});

router.get('/:id', function(req, res){
   db.user.findById(req.params.id).then(function(user) {
        res.render('userprofile', {user: user});
    });
});




module.exports = router;