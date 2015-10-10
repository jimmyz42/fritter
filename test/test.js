var assert = require("assert");
var tweet_list = require("../model/db");

// Test the tweet_list database model
describe('tweet_list', function() {
  var tweet1 = {author: 'a', text: '1'};
  var tweet2 = {author: 'b', text: '2'};
  var tweet3 = {author: 'c', text: '3'};
  var tweet4 = {author: 'd', text: '4'};  
  var tweet5 = {author: 'a', text: '5'};  

  // Test the database's add method, adding tweets.
  describe('#add', function () {
    
    // Test adding a single tweet to the list.
    it('should add single tweet to end correctly', function () {
      tweet_list.add(tweet1);
      assert.deepEqual([tweet1], tweet_list.getTweets());
    });


    // Test adding multiple tweets to the list.
    it('should add multiple tweets to end correctly', function() {
      tweet_list.add(tweet2);
      tweet_list.add(tweet3);
      tweet_list.add(tweet4);
      tweet_list.add(tweet5);
      assert.deepEqual([tweet1, tweet2, tweet3, tweet4, tweet5], tweet_list.getTweets());
    });

  });

  // Test the database's remove method, removing tweets.
  describe('#remove', function() {
    
    // Test removing a tweet from the end.
    it('should remove tweets from end correctly', function() {
	  tweet_list.remove(3);
      assert.deepEqual([tweet1, tweet2, tweet3, tweet5], tweet_list.getTweets());
    });


    // Test removing a tweet from the middle.
    it('should remove tweets from middle correctly', function() {
	  tweet_list.remove(1);
      assert.deepEqual([tweet1, tweet3, tweet5], tweet_list.getTweets());
    });

  });

  // Test the database's getTweets method.
  describe('#getTweets', function() {
    
    // Get all tweets
    it('should get all tweets correctly', function() {
      assert.deepEqual([tweet1, tweet3, tweet5], tweet_list.getTweets());
    });


    // Get tweets from single author, 0 results
    it('should get tweets from author correctly when there are 0 results', function() {
      assert.deepEqual([], tweet_list.getTweets('b'));
    });


    // Get tweets from single author, 1 result
    it('should get tweets from author correctly when there is 1 result', function() {
      assert.deepEqual([tweet3], tweet_list.getTweets('c'));
    });


    // Get tweets from single author, 2 results
    it('should get tweets from autho correctly when there are 2 results', function() {
      assert.deepEqual([tweet1, tweet5], tweet_list.getTweets('a'));
    });

  }); 

}); 
