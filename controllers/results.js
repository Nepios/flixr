var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/', function(req, res){
	var searchTerm = req.query.title;
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/search/title/" + searchTerm + '/fuzzy', 
		function(error, response, body){
			if (!error && response.statusCode == 200){
				res.render('results.ejs', {
				movielist: JSON.parse(body),
				title: searchTerm
				});
			}
		});
});

router.get('/:id', function (req, res){
	var movieIndex = req.params.id;
	var searchTerm = req.query.title ? req.query.q : '';
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" + movieIndex,
	function(error, response, body){
		if (!error && response.statusCode == 200){
			var movieData =JSON.parse(body);
			request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" + movieIndex + "/available_content",
			function(error, response, body){
			if (!error && response.statusCode == 200){
				var platforms = JSON.parse(body);
				res.render('show.ejs', {
					platforms: JSON.parse(body),
					title: searchTerm,
					id: movieIndex,
					movieData: movieData
					});
				}
			});
		}
	});


});


module.exports = router;