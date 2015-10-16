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

// Function to check if a username exists
// @param username Username to be checked
// @return True if username already exists, False otherwise
exports.usernameExists = function(username, callback) {
	userModel.find({username: username}, function(err, users) {
		if(err) console.log(err);
		callback(users.length > 0);
		});
	};

// Function to check if a username is okay
// @param username Username to be checked
// @return True if username is 1-16 characters only containing numbers,
// letters, and underscore, False otherwise
exports.usernameOkay = function(username) {
	return typeof(username) === 'string' && /^\w{1,16}$/.test(username);
	};

// Function to check if a password is okay
// @param password Password to be checked
// @return True if password is at least 8 characters, False otherwise
exports.passwordOkay = function(password) {
	return typeof(password) === 'string' && password.length >= 8;
	};

// Function to check logins
// @param username Username of user
// @param password Password of user
// @return True if the username and password match, False otherwise
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

// Adds a user to the database
// @param username Username of the user
// @param password Password of the user
// @return The user added
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

// Gets a user from the database
// @param username Username of the user
// @return the User object
exports.getUser = function(username, callback) {
	userModel.find({ username: username }, function(err, users) {
		if(err) console.log(err);
		callback(users[0]);
	});
};

// Lets a user follow another user
// @param follower Person who is following someone
// @param followed Person who is being followed
// @return none
exports.follow = function(follower, followed, callback) {
	userModel.update({ username: follower }, { $addToSet: { following: followed } }, function(err, data) {
		if(err) console.log(err);
		userModel.update({ username: followed }, { $addToSet: { followers: follower } }, function(err, data) {
			console.log(data);
			if(err) console.log(err);
			callback();
		});
	});
};

// Lets a user unfollow another user
// @param follower Person who is unfollowing someone
// @param followed Person who is being unfollowed
// @return none
exports.unfollow = function(follower, followed, callback) {
	userModel.update({ username: follower }, { $pull: { following: followed } }, function(err, data) {
		if(err) console.log(err);
		userModel.update({ username: followed }, { $pull: { followers: follower } }, function(err, data) {
			if(err) console.log(err);
			callback();
		});
	});
};

// Sets the display name of a user
// @param username Username of the user
// @param name Display name to be set
// @return none
exports.setName = function(username, name, callback) {
	userModel.update({ username: username }, { name: name }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};

// Sets the about me text of a user
// @param username Username of the user
// @param about About me text to be set
// @return none
exports.setAbout = function(username, about, callback) {
	userModel.update({ username: username }, { about: about }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};

// Sets the password of a user
// @param username Username of the user
// @param password Password to be set
// @return none
exports.setPassword = function(username, password, callback) {
	userModel.update({ username: username }, { password: password }, function(err, data) {
		if(err) console.log(err);
		callback();
	});
};












