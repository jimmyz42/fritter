/* Routing script to handle GET and POST requests for specific user pages */

var express = require('express');
var tweet_model = require('../model/tweet_model.js');
var user_model = require('../model/user_model.js');
var router = express.Router();

/* GET tweets for a certain user */
router.get('/:user', function(req, res, next) {
	user_model.getUser(req.params.user, function(user) {
		if(user) tweet_model.getTweets(req.params.user, function(tweets) {
			res.render('users', {
				title: 'Fritter',
				user: req.params.user,
				username: req.session.username,
				name: user.name,
				about: user.about,
				tweets: tweets,
				following: user.followers.indexOf(req.session.username) !== -1
			});
		});
		else res.render('notfound', {
			title: 'Fritter',
			username: req.session.username,
			item: 'user'
		});
	});
});

/* POST follow user */
router.post('/:user/follow', function(req, res, next) {
	if(req.params.user === req.session.username) {
		res.status(400);
		res.end("error");
		}
	else user_model.usernameExists(req.params.user, function(exists) {
		if(exists) user_model.follow(req.session.username, req.params.user, function() {
			res.end('success');
		});
		else {
			res.status(500);
			res.end('error');
			}
	});
});

/* POST unfollow user */
router.post('/:user/unfollow', function(req, res, next) {
	if(req.params.user === req.session.username) {
		res.status(400);
		res.end("error");
		}
	else user_model.usernameExists(req.params.user, function(exists) {
		if(exists) user_model.unfollow(req.session.username, req.params.user, function() {
			res.end('success');
		});
		else {
			res.status(500);
			res.end('error');
			}
	});
});

module.exports = router;
