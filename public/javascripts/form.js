// On document load, associate onclick handlers with buttons

$(function() {
	$('#login-submit').click(function() {
		$.post('/login', {
			username: $('#username').val()
		}).done(function() {
			location.reload(true);
		});
	});

	$('#logout-submit').click(function() {
		$.post('/logout').done(function() {
			location.reload(true);
		});
	});

	$('.x-button').click(function() {
		$.post('/tweets/delete', {
			index: $(this).val()
		}).done(function() {
			location.reload(true);
		});
	});

	$('#tweet-submit').click(function() {
		$.post('/tweets/add', {
			tweet: $('#tweet-box').val()
		}).done(function(data) {
			if(data === "success") {
				location.reload(true);
				}
			else if(!$('#tweet-box').next().hasClass('error-msg')) {
				$('#tweet-box').after('<div class = "error-msg">' +
					'Freet must be between 1 and 140 characters long' +
				'</div>');
				}
		});
	});
});
