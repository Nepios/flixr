var express = require("express");
var router = express.Router();
var cheerio = require('cheerio');
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
				title: searchTerm,
				});
			}
		});
});

router.get('/show/:id', function (req, res){
	var showIndex = req.params.id;
	request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" + showIndex,
			function(error, response, body){
				if (!error && response.statusCode == 200){
					var showData =JSON.parse(body);
					var searchTerm = showData.title;
					request('http://usa.netflixable.com/2016/01/complete-alphabetical-list-sat-jan-23.html', function (error, response, data) {
				  if (!error && response.statusCode == 200) {
				    var $ = cheerio.load(data);
				    var links = $('b a').map(function(index, element) {
				      return {link: $(this).text()}
				    }).get();
				    function  search(nameKey, array){
			    		for (var i = 0; i < array.length; i++) {
			        	if (array[i].link.toLowerCase().indexOf(nameKey.toLowerCase()) !== -1) {
			            return "Netflix";
				        	}
				    	}
				    	return -1;
					    }
				    var netflix = search(searchTerm, links);
				    }
					request("https://api-public.guidebox.com/v1.43/US/" + process.env.SECRET_KEY + "/show/" +showIndex + "/available_content",
					function(error, response, body){
					if (!error && response.statusCode == 200){
						var platforms = JSON.parse(body);
						res.render('show.ejs', {
							platforms: JSON.parse(body),
							title: searchTerm,
							id: showIndex,
							showData: showData,
							netflix: netflix
							});
						}
					});
			});
	}
});
});



module.exports = router;