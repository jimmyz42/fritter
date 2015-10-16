/* Routing script to handle GET and POST requests for tweets */

var express = require('express');
var tweet_model = require('../model/tweet_model');
var user_model = require('../model/user_model');
var router = express.Router();

/* GET home feed (tweets of people I'm following). */
router.get('/', function(req, res, next) {
    user_model.getUser(req.session.username, function(user) {
        tweet_model.getTweets(user.following, function(tweets) {
            res.render('feed', {
                title: 'Fritter',
                titleText: 'My Fritter Feed',
                subtitleText: 'Follow people to see their latest freets here!',
                username: req.session.username,
                tweets: tweets
            });
        });
    });
});

/* POST add new tweet. */
router.post('/add', function(req, res, next) {
    tweet_model.add(req.session.username, req.body.tweet, undefined, function(okay) {
        if(okay) res.end('success');
        else {
            res.status(400);
            res.end('error');
            }
    });
});

/* POST delete tweet. */
router.post('/delete', function(req, res, next) {
	tweet_model.remove(req.body.id, function(okay) {
        if(okay) res.end('success');
        else {
            res.status(500);
            res.end('error');
            }
    });
});

/* POST retweet tweet. */
router.post('/retweet', function(req, res, next) {
    tweet_model.add(req.session.username, req.body.tweet, req.body.retweet_from, function(okay) {
        if(okay) res.end('success');
        else {
            res.status(500);
            res.end('error');
            }
    });
});

// NOTE: It is intentional that you can like/unlike your own tweets.

/* POST like tweet */
router.post('/like', function(req, res, next) {
	tweet_model.like(req.session.username, req.body.id, function(okay) {
        if(okay) res.end('success');
        else {
            res.status(500);
            res.end('error');
            }
    });
});

/* POST unlike tweet */
router.post('/unlike', function(req, res, next) {
	tweet_model.unlike(req.session.username, req.body.id, function(okay) {
        if(okay) res.end('success');
        else {
            res.status(500);
            res.end('error');
            }
    });
});

module.exports = router;
