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
  next();
});
app.use("/about", function (req, res){
  res.render('about');
});
app.use('/user', require('./controllers/user'));
app.use("/results", require("./controllers/results"));
app.use("/favorite", require("./controllers/favorite"));
app.use("/current", require("./controllers/current"));
app.use("/auth", require("./controllers/auth"));
app.use("/friend", require('./controllers/friend'));
app.use('/', require('./controllers/main'));

app.get('*', function(req, res){
  res.render('404');
});

app.listen(process.env.PORT || 3000);