var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('./utils/auth')(passport);

function authenticationMiddleware (req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  } else {
    res.redirect('/login');
  }
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const createAccountRouter = require('./routes/createAccount');
const accountCreatedRouter = require('./routes/accountCreated');
const passwordChangedRouter = require('./routes/passwordChanged');
const forgottenPasswordRouter = require('./routes/forgottenPassword');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 60 * 1000}
}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/forgottenPassword', forgottenPasswordRouter);
app.use('/passwordChanged', passwordChangedRouter);
app.use('/accountCreated', accountCreatedRouter);
app.use('/createAccount', createAccountRouter);
app.use('/login', loginRouter);
app.use('/logout', authenticationMiddleware, logoutRouter);
app.use('/users', authenticationMiddleware, usersRouter);
app.use('/', indexRouter);
//app.use('/', authenticationMiddleware, indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
