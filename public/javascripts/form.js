// On document load, associate onclick handlers with buttons

$(function() {
	var clearErrors = function(elems) {
		elems.forEach(function(elem) {
			if(elem.next().hasClass('error-msg')) elem.next().remove();
			});
		};

	var displayError = function(err, elem, msg) {
		if(err) elem.after('<div class = "error-msg">' + msg + '</div>');
		};

	$('#create-account').click(function() {
		$.post('/account/create', {
			username: $('input[name="username"]').val(),
			password: $('input[name="password"]').val(),
			password2: $('input[name="password2"]').val()
		}).done(function(data) {
			window.location = '/';
		}).fail(function(data) {
			var error = data.responseJSON;
			clearErrors([$('input[name="username"]'),
				$('input[name="password"]'),
				$('input[name="password2"]')]);
			displayError(error.username, $('input[name="username"]'), 'Username must be between 1 and' + 
				' 16 characters and only contain letters, numbers, and underscores');
			displayError(error.taken, $('input[name="username"]'), 'Username taken');
			displayError(error.password, $('input[name="password"]'), 'Password must be at least 8 characters');
			displayError(error.mismatch, $('input[name="password2"]'), 'Passwords do not match');
		});
	});

	$('#login-submit').click(function() {
		$.post('/login', {
			username: $('input[name="username"]').val(),
			password: $('input[name="password"]').val()
		}).done(function(data) {
			window.location = '/';
		}).fail(function(data) {
			clearErrors([$('input[name="password"]')]);
			displayError(true, $('input[name="password"]'), 'Incorrect username or password');
		});
	});

	$('#logout-submit').click(function() {
		$.post('/logout').done(function() {
			window.location = '/';
		});
	});

//TWEETS
	$('.x-button').click(function() {
		$.post('/tweets/delete', {
			id: $(this).parent().children('input[name="id"]').val()
		}).done(function() {
			location.reload(true);
		});
	});

	$('#tweet-submit').click(function() {
		$.post('/tweets/add', {
			tweet: $('#tweet-box').val()
		}).done(function(data) {
			location.reload(true);
		}).fail(function(data) {
			clearErrors([$('#tweet-box')]);
			displayError(true, $('#tweet-box'), 'Freet must be between 1 and 140 characters');
		});
	});

	$('.retweet-button').click(function() {
		$.post('/tweets/retweet', {
			tweet: $(this).parent().children('input[name="text"]').val(),
			retweet_from: $(this).parent().children('input[name="author"]').val()
		}).done(function() {
			location.reload(true);
		});
	});

	$('.like').click(function() {
		$.post('/tweets/like', {
			id: $(this).parent().children('input[name="id"]').val()
		}).done(function() {
			location.reload(true);
		});
	});

	$('.unlike').click(function() {
		$.post('/tweets/unlike', {
			id: $(this).parent().children('input[name="id"]').val()
		}).done(function() {
			location.reload(true);
		});
	});

// USERS
	$('.follow-button').click(function() {
		$.post('/users/'+$(this).val()+'/follow').done(function() {
			location.reload(true);
		});
	});

	$('.unfollow-button').click(function() {
		$.post('/users/'+$(this).val()+'/unfollow').done(function() {
			location.reload(true);
		});
	});

// PROFILE
	$('#update-profile').click(function() {
		$.post('/account/name', { 
			name: $('input[name="name"]').val()
		});
		$.post('/account/about', {
			about: $('textarea[name="about"]').val()
		});
		if($('input[name="password"]').val()) $.post('/account/password', {
			oldPassword: $('input[name="oldPassword"]').val(),
			password: $('input[name="password"]').val(),
			password2: $('input[name="password2"]').val()
		}).done(function(data) {
			location.reload(true);
		}).fail(function(data) {
			var error = data.responseJSON;
			clearErrors([$('input[name="oldPassword"]'),
				$('input[name="password"]'),
				$('input[name="password2"]')]);
			displayError(error.incorrect, $('input[name="oldPassword"]'), 'Incorrect password');
			displayError(error.password, $('input[name="password"]'), 'Password must be at least 8 characters');
			displayError(error.mismatch, $('input[name="password2"]'), 'Passwords do not match');
		});
	});



});
