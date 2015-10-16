var assert = require("assert");
var tweet_model = require("../model/tweet_model");
var user_model = require("../model/user_model");

// Test the tweet_model database model
describe('tweet_model', function() {

  // Test the database's add method, adding tweets.
  describe('#add', function () {
    
    // Test adding a single tweet to the list.
    it('should add single tweet to end correctly', function () {
      tweet_model.add('alice', 'hello', undefined, function() {
		tweet_model.getTweets('alice', function(tweets) {
		  assert.equal(1, tweets.length);
		  assert.equal('alice', tweets[0].author);
		  assert.equal('hello', tweets[0].text);
		});
	  });
	});

  });

  // Test the database's remove method, removing tweets.
  describe('#remove', function() {
    
    // Test removing a tweet from the beginning.
    it('should remove tweets from beginning correctly', function() {
	  tweet_model.add('bob', 'bye', undefined, function() {});
	  tweet_model.getTweets('alice', function(tweets) {
		var id = tweets[0]._id;
		tweet_model.remove(id, function() {
		  tweet_model.getTweets(undefined, function(tweets) {
			assert.equal(1, tweets.length);
			assert.equal('bob', tweets[0].author);
			assert.equal('bye', tweets[0].text);
		  });
		});
	  });
    });

  });

  // Test the database's getTweets method.
  describe('#getTweets', function() {
    
    // Get all tweets
    it('should get all tweets correctly', function() {
	  tweet_model.getTweets(undefined, function(tweets) {
		assert.equal(1, tweets.length);
		assert.equal('bob', tweets[0].author);
		assert.equal('bye', tweets[0].text);
	  }); 
    });

  }); 

});

// Test the user_model database model
describe('user_model', function() {

  // Test username validation
  describe('#usernameOkay', function () {
    
    // Test username length
    it('should be 1-16 characters', function () {
      assert.equal(false, user_model.usernameOkay(''));
      assert.equal(true, user_model.usernameOkay('12345678910'));
      assert.equal(false, user_model.usernameOkay('abcdefghijklmnopqrstuvwxyz'));
	});

	// Test characters
    it('should only have letters, numbers, and _', function () {
      assert.equal(false, user_model.usernameOkay('abcd.efg'));
      assert.equal(true, user_model.usernameOkay('1234abcd_jk'));
	});

  });

  // Test password validation
  describe('#passwordOkay', function () {
    
    // Test password length
    it('should be >=8 characters', function () {
      assert.equal(false, user_model.passwordOkay('ab'));
      assert.equal(true, user_model.passwordOkay('12345678910'));
    });

  });

  // Test add user
  describe('#add', function () {

    // Test add user
    it('should add user correctly', function () {
	  user_model.add('alice', 'mylittlepony', function() {
		user_model.getUser('alice', function(user) {
		  assert.equal('alice', user.username);
		  assert.equal('mylittlepony', user.password);
		});
	  });
    });
  });

  // Test authentication
  describe('#auth', function() {
	
	// Test authenticate user correct 
	it('should authenticate', function() {
	  user_model.auth('alice', 'mylittlepony', function(okay) {
		assert.equal(true, okay);
	  });
	});
	
	// Test authenticate user correct 
	it('should not authenticate', function() {
	  user_model.auth('alice', 'mylittlebrony', function(okay) {
		assert.equal(false, okay);
	  });
	});
  
  });

  // Test follow
  describe('#follow', function() {

	// Test A follow B, B is in A's following list
	it('A should have B as a person A is following', function() {
	  user_model.add('bob', 'thebuilder', function() {});
	  user_model.follow('alice', 'bob', function() {
		user_model.getUser('alice', function(user) {
		  assert.deepEqual(['bob'], user.following);
		});
	  });
	});

	// Test A follows B, A is in B's followers list
	it('B should have A as a follower', function() {
	  user_model.getUser('bob', function(user) {
		assert.deepEqual(['alice'], user.followers);
	  });
	});

  });

});
