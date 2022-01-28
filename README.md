# Okta Shopping App  

This example will guide you through the code to build a simple Node.js Shopping App with the Okta's Customer Hosted Sign-In Widget and Minio Server to host the store's assets.

We will use [Minio Javascript Client SDK](https://docs.minio.io/docs/javascript-client-quickstart-guide) to fetch the application's image assets from the Minio Server.

 
## Prerequisites

* Install mc from [here](https://docs.minio.io/docs/minio-client-quickstart-guide).
* Install Minio Server from [here](https://docs.minio.io/docs/minio ).

## Install Packages

Get the code for this example as shown below and then do npm install to get the express, handlebars and minio node-modules installed.

`main-store.js` will serve as our app's entry point.

```sh
git clone https://github.com/deepamahalingam-okta/okta_commerce.git
cd  okta_commerce
npm install
```

## Set Up Bucket

1. We've created a public minio server https://play.minio.io:9000 for developers to use as a sandbox. Minio Client `mc` is  preconfigured to use the play server. Download [ `mc` ](https://docs.minio.io/docs/minio-client-quick-start-guide) to do the next set of steps.
Make a bucket called `minio-store` on play.minio.io. Use `mc mb` command to accomplish this. More details on the `mc mb` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#mb).


```sh
mc mb play/okta-commerce
```

2. Store product image assets can be set to public readwrite. Use `mc policy` command to set the access policy on this bucket to "both". More details on the `mc policy` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#policy).

```sh
mc policy set public play/okta-commerce
```

3. Upload store product pictures into this bucket.  Use `mc cp`  command to do this. More details on the `mc cp` command can be found [here](https://docs.minio.io/docs/minio-client-complete-guide#cp).

```sh
mc cp ~/Downloads/Product-1.jpg play/okta-commerce/
mc cp ~/Downloads/Product-2.jpg play/okta-commerce/
mc cp ~/Downloads/Product-3.jpg play/okta-commerce/
mc cp ~/Downloads/Product-4.jpg play/okta-commerce/
```

**NOTE** : We have already created a minio-store bucket on play.minio.io and copied the assets used in this example, into this bucket.


## Pointing to Minio Server with Keys


In `index.js` file, require minio and instantiate a `minioClient` object with play server's endpoint, port and access keys. Access keys shown in this example are open to public


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

## Run The App

Do the following steps to start the app server.

```sh
node index.js
```

To see the app, open a browser window and visit http://localhost:3000
