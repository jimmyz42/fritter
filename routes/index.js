/* Routing script to handle GET and POST requests */

var express = require('express');
var tweet_model = require('../model/tweet_model');
var user_model = require('../model/user_model');
var router = express.Router();

/* GET home page with all tweets. */
router.get('/', function(req, res, next) {
	tweet_model.getTweets(undefined, function(tweets) {
		res.render('feed', {
			title: 'Fritter',
			titleText: 'Fritter',
			subtitleText: 'The social messaging site that Fritters your time away!',
			username: req.session.username,
			tweets: tweets
		});
	});
});

/* GET sign in page */
router.get('/login', function(req, res, next) {
	res.render('login', {
		title: 'Fritter',
		username: req.session.username
	});
});

/* POST sign in */
router.post('/login', function(req, res, next) {
	user_model.auth(req.body.username, req.body.password, function(okay) {
		if(okay) {
			req.session.username = req.body.username;
			res.end('success');
			}
		else {
			res.status(401);
			res.end('error');
			}
	});
});

/* POST sign out */
router.post('/logout', function(req, res, next) {
	req.session.username = undefined;
	res.end('success');
});

module.exports = router;

