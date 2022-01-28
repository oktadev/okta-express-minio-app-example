var express = require('express');
var app = express();
const session = require('express-session');
var assets = require('./services/minio-handler');

// Set up handlebars view engine
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'this should be secure',
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
  const { userContext } = req;
  res.render('login', { url: assets });
});

app.get('/forgot-password', function(req, res){
  const { userContext } = req;
  res.render('forgot-password', { url: assets });
});

app.get('/unlock', function(req, res){
  const { userContext } = req;
  res.render('unlock', { url: assets });
});

app.get('/register', function(req, res){
  const { userContext } = req;
  res.render('register', { url: assets });
});

app.set('port', process.env.PORT || 3000);


// Custom 404 page

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.render('404');
});

// Custom 500 page

app.use(function(err, req, res, next) {
  res.type('text/plain');
  res.render('500');
});

// Start the app

app.listen(app.get('port'), function(){
  console.log('App started on http://localhost:' + app.get('port'));
  console.log('Press Ctrl + c to terminate');
});
