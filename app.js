var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var tweets = require('./routes/tweets');
var account = require('./routes/account');

// mongodb
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/fritter');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("database connected");
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"359387230975", resave:true, saveUninitialized:true}));
app.use(express.static(path.join(__dirname, 'public')));

// if not logged in, redirect to login page
app.use(function(req, res, next) {
	if(req.session.username === undefined && req.path !== '/login' && req.path !== '/account/create') {
		req.method = 'get';
		req.url = '/login';
		}
	next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/tweets', tweets);
app.use('/account', account);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.render('notfound', {
	title: 'Fritter',
	username: req.session.username,
	item: 'page'
  });
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
