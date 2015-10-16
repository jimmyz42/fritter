// Model class for storing tweets

var mongoose = require('mongoose');

// A list of tweet objects, each with "author" and "text" fields
var tweetSchema = mongoose.Schema({
	author: String,
	text: String,
	retweet_from: String
});

var tweetModel = mongoose.model("Tweet", tweetSchema);

// Function to add tweets to the list
// @param tweet Tweet object to be appended to the list.
// Tweet object must contain string "author" and "text" fields, with text between 1 and 140 characters
// @return true if tweet was valid and added, false otherwise
exports.add = function(author, text, retweet_from, callback) {
	console.log("exports.add");
	if(typeof(author) === 'string' && typeof(text) === 'string' && text.length > 0 && text.length <= 140) {
		console.log("create tweet");
		tweetModel.create({
			author: author,
			text: text,
			retweet_from: retweet_from
		}, function(err, tweets) {
			if(err) {
				callback(false);
				}
			else {
				callback(true);
				}
			});
		}
	else {
		callback(false);
		}
	};

// Function to remove tweets from the list
// @param index Index of tweet to be removed
// @return true if index was valid and tweet was removed, false otherwise
exports.remove = function(id, callback) {
	tweetModel.remove({_id: id}, function(err, tweets) {
		if(err) {
			console.log(err);
			callback(false);
			}
		else {
			callback(true);
			}
		});
	};

// Function to get the list of tweets in chronological order
// @param user Get only tweets of this specific user or users
// If user === undefined, returns all tweets
// If user is an array, returns tweets of all users in the array
// Otherwise, returns tweets of the single username specified
// @return The list of tweet objects
exports.getTweets = function(user, callback) {
	if(user === undefined) {
		tweetModel.find(function(err, tweets) {
			if(err) console.log(err);
			callback(tweets);
			});
		}
	else if(typeof(user) === 'array') {
		tweetModel.find({author: {$in: user}}, function(err, tweets) {
			if(err) console.log(err);
			callback(tweets);
			});
		}
	else {
		tweetModel.find({author: user}, function(err, tweets) {
			console.log("author = "+user);
			console.log(tweets);
			if(err) console.log(err);
			callback(tweets);
			});
		}
	};
