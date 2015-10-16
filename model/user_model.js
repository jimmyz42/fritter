// Model class for Users

var mongoose = require('mongoose');

// A list of tweet objects, each with "author" and "text" fields
var userSchema = mongoose.Schema({
    username: String,
    password: String,
	name: String,
	about: String,
    following: [String],
	followers: [String]
});

var userModel = mongoose.model("User", userSchema);

// TODO comment
exports.usernameExists = function(username, callback) {
	userModel.find({username: username}, function(err, users) {
		if(err) console.log(err);
		callback(users.length > 0);
		});
	};

exports.usernameOkay = function(username) {
	return typeof(username) === 'string' && /^\w{1,16}$/.test(username);
	};

exports.passwordOkay = function(password) {
	return typeof(password) === 'string' && password.length >= 8;
	};

exports.auth = function(username, password, callback) {
	userModel.find({username: username}, function(err, users) {
		if(err) console.log(err);
		if(users.length == 0) {
			callback(false);
			}
		else {
			callback(users[0].password === password);
			}
		});
	};

exports.add = function(username, password, callback) {
	//if(!callback) callback = function(){};
	userModel.create({
		username: username,
		password: password,
		name: "",
		about: "",
		followers: [],
		following: []
	}, function(err, user) {
		if(err) console.log(err);
		callback(user);
		});
	};

exports.remove = function(username, callback) {
	// very annoying to implement
	// would need to remove user, from followers, from following, from tweets, from retweets
	};

exports.getUser = function(username, callback) {
	userModel.find({ username: username }, function(err, users) {
		if(err) console.log(err);
		callback(users[0]);
	});
};

exports.follow = function(follower, followed, callback) {
	userModel.update({ username: follower }, { $addToSet: { following: followed } }, function(err, data) {
		console.log(data);
		if(err) console.log(err);
		userModel.update({ username: followed }, { $addToSet: { followers: follower } }, function(err, data) {
			console.log(data);
			if(err) console.log(err);
			callback();
		});
	});
};

exports.unfollow = function(follower, followed, callback) {
	userModel.update({ username: follower }, { $pull: { following: followed } }, function(err, data) {
		if(err) console.log(err);
		userModel.update({ username: followed }, { $pull: { followers: follower } }, function(err, data) {
			if(err) console.log(err);
			callback();
		});
	});
};

exports.setName = function(username, name, callback) {
	userModel.update({ username: username }, { name: name }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};

exports.setAbout = function(username, about, callback) {
	userModel.update({ username: username }, { about: about }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};

exports.setPassword = function(username, password, callback) {
	userModel.update({ username: username }, { password: password }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};












