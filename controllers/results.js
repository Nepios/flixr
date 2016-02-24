var express = require("express");
var router = express.Router();
var db = require('../models');
var bodyParser = require('body-parser');
var request = require('request');
router.use(bodyParser.urlencoded({extended: false}));

router.get('/show', function(req, res){
	var searchTerm = req.query.show;
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/search/title/" + searchTerm + '/fuzzy', 
		function(error, response, body){
			if (!error && response.statusCode == 200){
				res.render('results.ejs', {
				showlist: JSON.parse(body),
				title: searchTerm
				});
			}
		});
});

router.get('/show/:id', function (req, res){
	var showIndex = req.params.id;
	var searchTerm = req.query.title ? req.query.q : '';
	console.log(searchTerm);
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" + showIndex,
	function(error, response, body){
		if (!error && response.statusCode == 200){
			var showData =JSON.parse(body);
			request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" +showIndex + "/available_content",
			function(error, response, body){
			if (!error && response.statusCode == 200){
				var platforms = JSON.parse(body);
				res.render('show.ejs', {
					platforms: JSON.parse(body),
					title: searchTerm,
					id: showIndex,
					showData: showData
					});
				}
			});
		}
	});
});

router.get('/movie', function(req, res){
	var searchTerm = req.query.movie;
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/search/movie/title/" + searchTerm + '/fuzzy', 
		function(error, response, body){
			if (!error && response.statusCode == 200){
				res.render('resultsmovie.ejs', {
				movielist: JSON.parse(body),
				title: searchTerm
				});
			}
		});
});

router.get('/movie/:id', function (req, res){
	var movieIndex = req.params.id;
	var searchTerm = req.query.title ? req.query.q : '';
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/movie/" + movieIndex,
	function(error, response, body){
		if (!error && response.statusCode == 200){
			var movieData =JSON.parse(body);
			request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" + movieIndex + "/available_content",
			function(error, response, body){
			if (!error && response.statusCode == 200){
				var platforms = JSON.parse(body);
				res.render('showmovie.ejs', {
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