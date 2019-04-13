var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var session = require('express-session');
var jwt = require('express-jwt');
var fs = require('fs');
var config = require("./token.config");
var publicKey = fs.readFileSync('./public.pub');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret:"lovo",
  resave:true,
  saveUninitialized:true
}));
if(config.token){
  
  app.use(jwt({secret:publicKey}).unless(config.unless));
}

app.use('/*', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token");
  }else{
    // render the error page
    res.status(err.status || 500);
    console.log("error:",err.message);
    res.render('error');
  }
  
});
module.exports = app;
