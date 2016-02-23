var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require("express");
var app = express();
var db = require('./models');
var bodyParser = require('body-parser');
var ejsLayouts = require("express-ejs-layouts");
var session = require('express-session');
var flash = require('connect-flash');
var request = require('request');
var resultCtrl = require("./controllers/results");
var favoriteCtrl = require("./controllers/favorite");
var currentCtrl = require("./controllers/current");
var authCtrl = require("./controllers/auth");
var strategies = require('./config/strategies');

app.set("view engine", 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));


app.use(flash());
app.use(session({
  secret: 'sasdlfkajsldfkajweoriw234234ksdfjals23',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(strategies.serializeUser);
passport.deserializeUser(strategies.deserializeUser);
passport.use(strategies.localStrategy);
passport.use(strategies.facebookStrategy);

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.alerts = req.flash;
  console.log(req.isAuthenticated());
  console.log(req.user);
  next();
});

app.use("/results", resultCtrl);
app.use("/favorite", favoriteCtrl);
app.use("/current", currentCtrl);
app.use("/auth", authCtrl);
app.use('/', require('./controllers/main'));

app.listen(3000);