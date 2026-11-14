// app.js
// This is the main file for my portfolio app.
// I made the project with express-generator using --view=ejs and then changed it for my site.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// express-ejs-layouts lets all my pages use one layout file,
// so I don't have to repeat the header and footer on every page
var expressLayouts = require('express-ejs-layouts');

// all my page routes are in routes/index.js
var indexRouter = require('./routes/index');

var app = express();

// telling express where my views are and that I'm using EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// turning on the layout and pointing it to views/layouts/layout.ejs
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// app.locals can be used in any EJS file
// I put my name and links here so if I need to change them I only change it once
app.locals.siteOwner = 'Farhan Khan';
app.locals.githubUrl = 'https://github.com/FarhanKhan-work';
app.locals.linkedinUrl = 'https://www.linkedin.com/in/farhan-khan-2a32272b2';
app.locals.email = 'Faarhankhan121@gmail.com';

// middleware
app.use(logger('dev'));                           // shows each request in the terminal
app.use(express.json());                          // lets the app read JSON data
app.use(express.urlencoded({ extended: false })); // lets the app read form data (for my contact form)
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // my CSS, JS and images come from the public folder

// using my routes for the whole site
app.use('/', indexRouter);

// if someone goes to a page that doesn't exist, send a 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler, shows my error.ejs page
app.use(function (err, req, res, next) {
  // only show the full error details when I'm testing locally
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { title: 'Error', page: '' });
});

module.exports = app;
