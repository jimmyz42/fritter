/* Routing script to handle GET and POST requests */

var express = require('express');
var tweet_list = require('../model/db.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Fritter',
		username: req.session.username,
		tweets: tweet_list.getTweets()
	});
});

/* POST sign in */
router.post('/login', function(req, res, next) {
	req.session.username = req.body.username;
	res.end('success');
});

/* POST sign out */
router.post('/logout', function(req, res, next) {
	req.session.username = undefined;
	res.end('success');
});

/* POST add new tweet. */
router.post('/tweets/add', function(req, res, next) {
	var tweet = {author: req.session.username, text: req.body.tweet};
	if(tweet_list.add(tweet)) {
		res.end('success');
		}
	else {
		res.end('error');
		}
});

/* POST delete tweet. */
router.post('/tweets/delete', function(req, res, next) {
	var index = Number(req.body.index);
	if(tweet_list.remove(index)) {
		res.end('success');
		}
	else {
		res.end('error');
		}
});

module.exports = router;
