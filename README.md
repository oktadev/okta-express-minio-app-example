# Okta Shopping App  


This example will guide you through the code to build a simple Node.js Shopping App with the Okta's Customer Hosted Sign-In widget and Minio Server to host the store's assets.

We will use [Minio Javascript Client SDK](https://docs.minio.io/docs/javascript-client-quickstart-guide) to fetch the application's image assets from the Minio Server.

 

## 1. Prerequisites

* Install mc  from [here](https://docs.minio.io/docs/minio-client-quickstart-guide).
* Install Minio Server from [here](https://docs.minio.io/docs/minio ).

## 2. Dependencies

* [Express web framework](http://expressjs.com).
* [Handlebars](http://handlebarsjs.com).

We will use Express for our application framework and Handlebars as the view engine.

## 3. Install Packages

Get the code for this example as shown below and then do npm install to get the express, handlebars and minio node-modules installed.

`main-store.js` will serve as our app's entry point.

```sh
git clone https://github.com/deepamahalingam-okta/okta_commerce.git
cd  okta_commerce
npm install
```

##  4. Set Up Bucket

1. We've created a public minio server https://play.minio.io:9000 for developers to use as a sandbox. Minio Client `mc` is  preconfigured to use the play server. Download [ `mc` ](https://docs.minio.io/docs/minio-client-quick-start-guide) to do the next set of steps.
Make a bucket called `minio-store` on play.minio.io. Use `mc mb` command to accomplish this. More details on the `mc mb` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#mb).


   ```sh
    mc mb play/minio-store
   ```
2. Store product image assets can be set to public readwrite. Use `mc policy` command to set the access policy on this bucket to "both". More details on the `mc policy` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#policy).

   ```sh
    mc policy public play/okta-store
   ```

3. Upload store product pictures into this bucket.  Use `mc cp`  command to do this. More details on the `mc cp` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#cp).

   ```sh
   mc cp ~/Downloads/Product-1.jpg play/okta-store/
   mc cp ~/Downloads/Product-2.jpg play/okta-store/
   mc cp ~/Downloads/Product-3.jpg play/okta-store/
   mc cp ~/Downloads/Product-4.jpg play/okta-store/
   ```

   **NOTE** : We have already created a minio-store bucket on play.minio.io and copied the assets used in this example, into this bucket.


## 5. Pointing to Minio Server with Keys


In `main-store.js` file, require minio and instantiate a `minioClient` object with play server's endpoint, port and access keys. Access keys shown in this example are open to public


```js
var Minio = require('minio');
var minioClient = new Minio.Client({
 	 endPoint: 'play.minio.io',
     port: 9000,
	 accessKey: 'Q3AM3UQ867SPQQA43P2F',
	 secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
});
```

**NOTE** : for using minio server locally also add ``secure: false,`` in above code.


## 6. Call listObjects

Set up a route for '/' in the minio-store.js file. Using the [listObjects]( https://docs.minio.io/docs/javascript-client-api-reference#listObjects) method, get a list of all the files from the minio-store bucket. listObjects returns product urls which are pushed into an array variable called assets. Pass the assets array to `home.handlebars` view.


```js
var minioBucket = 'okta-store'

app.get('/', function(req, res){
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
```

## 7. Create Views

Loop through `assets_url` in `home.handlebars` to render the thumbnails of product images. For simplicity in this example we do not use a database to store rows of product information. But you may store the image url from this array into your products schema if needed.

```js
<!-- Page Features -->
<div class="row text-center">
	{{#each url}}
     <div class="col-md-3 col-sm-6 hero-feature">
          <div class="thumbnail">
               <img src="{{this}}" max-height=200 max-width=200 alt="">
               <div class="caption">
                     <h3>Product Name</h3>
                     <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                     <p> <a href="#" class="btn btn-primary">Buy Now!</a> <a href="#" class="btn btn-default">More Info</a> </p>
                </div>
           </div>
      </div>
  {{/each}}   
 </div>
```

## 8. Run The App

Do the following steps to start the app server.

  ```sh
  git clone https://github.com/deepamahalingam-okta/okta_commerce
  cd okta_commerce
  npm install
  node main-store.js
  ```

  To see the app, open a browser window and visit http://localhost:3000

## 9.  Explore Further.
 
