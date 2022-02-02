var express = require('express');
var app = express();
var session = require('express-session');
var assets = require('./services/minio-handler');

// Set up handlebars view engine
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'look the other way while I type this',
  resave: true,
  saveUninitialized: false
}));

// Routes for the app
app.get('/', function(req, res){
  const { userContext } = req;
  res.render('home', { url: assets, userContext });
});

app.get('/login', function(req, res){
  const { userContext } = req;
  res.render('login', { url: assets, userContext });
});

app.get('/logout', function(req, res){
  res.render('login', { url: assets });
});

app.get('/forgot-password', function(req, res){
  res.render('forgot-password', { url: assets });
});

app.get('/unlock', function(req, res){
  res.render('unlock', { url: assets });
});

app.get('/register', function(req, res){
  res.render('register', { url: assets });
});

app.get('/callback', function(req, res){
  // exchange code (req.query.code) for tokens
  res.render('home', { url: assets });
});

app.set('port', process.env.PORT || 3000);

// Start the app
app.listen(app.get('port'), function(){
  console.log('App started on http://localhost:' + app.get('port'));
  console.log('Press ctrl + c to terminate');
});
