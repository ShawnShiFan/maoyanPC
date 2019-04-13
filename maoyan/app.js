var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');
var cinemasRouter = require('./routes/cinemas');
var newsRouter = require('./routes/news');
var queryRouter = require('./routes/query');
var screenRouter = require('./routes/screen');
var app = express();

app.use(session({
  secret:"lovo",
  resave:true,
  saveUninitialized:false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/cinemas', cinemasRouter);
app.use('/news', newsRouter);
app.use('/query', queryRouter);
app.use('/screen', screenRouter);

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

// module.exports = app;
app.listen(3001,function(){
  console.log('服务器已启动...')
})
