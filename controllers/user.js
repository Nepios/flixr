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
  db.user.find({
    where: {
      id: req.params.id},
      include: [db.show]
      }).then(function(user) {
        res.render('userprofile', {user: user});
    });
  });

// router.get('/edit', function(req, res){
//   if (req.user.id){
//     db.user.findById(req.user.id).then(function(user){
//       res.render('editprofile', {user:user});
//     });
//   }
// });

module.exports = router;