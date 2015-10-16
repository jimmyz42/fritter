/* Routing script to handle GET and POST requests for user accounts */

var express = require('express');
var tweet_model = require('../model/tweet_model.js');
var user_model = require('../model/user_model.js');
var router = express.Router();

/* GET create account page */
router.get('/create', function(req, res, next) {
    res.render('create', {
        title: 'Fritter',
        username: req.session.username
    });
});

/* POST create new account */
router.post('/create', function(req, res, next) {
    var flags = {};
    if(!user_model.usernameOkay(req.body.username)) {
        flags.username = true;
        }
    if(!user_model.passwordOkay(req.body.password)) {
        flags.password = true;
        }
    if(req.body.password !== req.body.password2) {
        flags.mismatch = true;
        }
    user_model.usernameExists(req.body.username, function(exists) {
        if(exists) flags.taken = true;
        if(Object.keys(flags).length > 0) {
            res.status(400);
            res.json(flags);
            }
        else user_model.add(req.body.username, req.body.password, function(user) {
            req.session.username = req.body.username;
            res.end('success');
        });
    });
});

/* GET followers page */
router.get('/followers', function(req, res, next) {
    user_model.getUser(req.session.username, function(user) {
        res.render('follow', {
            title: 'Fritter',
            username: req.session.username,
            type: 'followers',
            follow: user.followers,
            following: user.following
        });
    });
});

/* GET following page */
router.get('/following', function(req, res, next) {
    user_model.getUser(req.session.username, function(user) {
        res.render('follow', {
            title: 'Fritter',
            username: req.session.username,
            type: 'following',
            follow: user.following,
            following: user.following
        });
    });
});

/* GET account settings page */
router.get('/', function(req, res, next) {
    user_model.getUser(req.session.username, function(user) {
        res.render('profile', {
            title: 'Fritter',
            username: req.session.username,
            name: user.name,
            about: user.about
        });
    });
});

/* POST set display name for account */
router.post('/name', function(req, res, next) {
    user_model.setName(req.session.username, req.body.name, function() {
        res.end("success");
    });
});

/* POST set about text for account */
router.post('/about', function(req, res, next) {
    user_model.setAbout(req.session.username, req.body.about, function() {
        res.end("success");
    });
});

/* POST set password for account */
router.post('/password', function(req, res, next) {
    var flags = {};
    if(!user_model.passwordOkay(req.body.password)) {
        flags.password = true;
        }
    if(req.body.password !== req.body.password2) {
        flags.mismatch = true;
        }
    user_model.getUser(req.session.username, function(user) {
        if(req.body.oldPassword !== user.password) flags.incorrect = true;
        if(Object.keys(flags).length > 0) {
            res.status(400);
            res.json(flags);
            }
        else user_model.setPassword(req.session.username, req.body.password, function() {
            res.end("success");
        });
    });
});

module.exports = router;
