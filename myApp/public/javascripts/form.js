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
		}).done(function() {
			location.reload(true);
		});
	});
});
