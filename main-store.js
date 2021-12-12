/*
 * Store Application, (C) 2016 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var express = require('express');
var app = express();
var Minio = require('minio');
var self
// Load the Sign-In Widget module
 

const session = require('express-session');
//const { ExpressOIDC } = require('@okta/oidc-middleware');

// Set up handlebars view engine.//
var handlebars = require('express-handlebars').create({
  defaultLayout: 'main'
});

// Instantiate a minioClient Object with an endPoint, port & keys.
var minioClient = new Minio.Client({
  endPoint: '192.168.1.7',
  port: 9000,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin',
  useSSL: false
});

var minioBucket = 'minio-store'

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

app.get('/home', function(req, res){
  console.log("Calling home")
  var assets = [];
  const { userContext } = req;
  self = req;

  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('home', { url: assets, userContext });
  });
});
app.get('/login', function(req,res) {
  const { userContext } = req;
  // res.render('home', { userContext });

  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('login', { url: assets, userContext });
  });
});

app.get('/logout', function(req, res) {
 // const { userContext } = req;
  // res.render('home', { userContext });

  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('login', { url: assets });
  });
});

app.get('/', function(req,res) {
  const { userContext } = req;
  self  = req
  console.log(self)
 // res.render('home', { userContext });

  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('home', { url: assets, userContext });
  });
});

app.get('/callback', function(req, res){
  console.log("Call callback")
  //res.render('home', { userContext });

  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.

    res.render('home', { url: assets });
  });
});


app.get('/about', function(req, res){
  console.log("Calling about")
  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('about', { url: assets });
  });
});
app.get('/unlock', function(req, res){
  console.log("Calling unlock")
  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('unlock', { url: assets });
  });
});
app.get('/', function(req,res) {
  console.log("Call slash")
  const { userContext } = req;
 // res.render('home', { userContext });

  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('home', { url: assets, userContext });
  });
});

app.get('/register', function(req, res){
  console.log("Calling register")
  var assets = [];
  var objectsStream = minioClient.listObjects(minioBucket, '', true)
  objectsStream.on('data', function(obj) {
    console.log(obj);
    // Lets construct the URL with our object name.
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
  });
  objectsStream.on('error', function(e) {
    console.log(e);
  });
  objectsStream.on('end', function(e) {
    console.log(assets);
    // Pass our assets array to our home.handlebars template.
    res.render('register', { url: assets });
  });
});

app.set('port', process.env.PORT || 3000);
// Custom 404 page.
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.render('404');
});

// Custom 500 page.
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.render('500');
});
//app.use(oidc.router);


// Start the app.
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
              app.get('port') + '; press Ctrl-C to terminate.' );
});
