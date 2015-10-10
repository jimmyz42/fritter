/* Routing script to handle GET and POST requests for specific user pages */

var express = require('express');
var tweet_list = require('../model/db.js');
var router = express.Router();

/* GET tweets for a certain user */
router.get('/:user', function(req, res, next) {
	res.render('users', {
		title: "Fritter",
		user: req.params.user,
		username: req.session.username,
		tweets: tweet_list.getTweets(req.params.user)
	});
});

module.exports = router;
