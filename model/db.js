// Model class for storing tweets

// A list of tweet objects, each with "author" and "text" fields
var tweets = [];

// Function to add tweets to the list
// @param tweet Tweet object to be appended to the list.
// Tweet object must contain string "author" and "text" fields, with text between 1 and 140 characters
// @return true if tweet was valid and added, false otherwise
exports.add = function(tweet) {
	if(typeof(tweet.author) === 'string' && typeof(tweet.text) === 'string' && tweet.text.length > 0 && tweet.text.length <= 140) {
		tweets.push(tweet);
		return true;
		}
	else {
		return false;
		}
	};

// Function to remove tweets from the list
// @param index Index of tweet to be removed
// @return true if index was valid and tweet was removed, false otherwise
exports.remove = function(index) {
	if(typeof(index) === 'number' && index >= 0 && index < tweets.length) {
		tweets.splice(index, 1);
		return true;
		}
	else {
		return false;
		}
	};

// Function to get the list of tweets
// @param user Get only tweets of this specific user
// If user === undefined, returns all tweets
// @return The list of tweet objects
exports.getTweets = function(user) {
	if(user === undefined) {
		return tweets;
		}
	else {
		return tweets.filter(function(tweet) {
			return tweet.author === user;
			});
		}
	};
