# Okta Shopping App  

This tutorial shows your how to build a basic Node.js Shopping App with Express.js, MinIO, and Okta's Sign-In-Widget.

Please read [How to Build a Basic Shopping App with Node.js and MinIO]() to step through the tutorial.

## Prerequisites

* [Node.js](https://nodejs.org/en/) v16.14.0
* [MinIO Client (mc)](https://docs.minio.io/docs/minio-client-quickstart-guide)
* [Minio Server](https://docs.min.io/)
* [Okta CLI](https://cli.okta.com/) v0.10.0

## Getting Started

To install this example application, run the following commands:

```sh
git clone https://github.com/oktadev/okta-express-minio-app-example.git
cd okta-express-minio-app-example
```

### Create an OIDC Application in Okta

Create a free developer account with the following command using the [Okta CLI](https://cli.okta.com):

```shell
okta register
```

If you already have a developer account, use `okta login` to integrate it with the Okta CLI.

Provide the required information. Once you register, create a client application in Okta with the following command:

```shell
okta apps create
```

You will be prompted to select the following options:
- Type of Application: **2: Single Page App**
- Redirect URI: `http://localhost:3000/callback`
- Logout Redirect URI: `http://localhost:3000/`

Run `cat .okta.env` (or `.okta.env` on Windows) to see the issuer and credentials for your app. Update `public/js/okta-config.js` with your Okta settings.


### Set Up Your MinIO Bucket

1. We've created a public minio server https://play.minio.io:9000 for developers to use as a sandbox. Minio Client `mc` is  preconfigured to use the play server. Make a bucket called `minio-store` on play.minio.io. Use `mc mb` command to accomplish this. 

```sh
mc mb play/okta-commerce
```

2. Store product image assets can be set to public readwrite. Use `mc policy` command to set the access policy on this bucket to "public". 

```sh
mc policy set public play/okta-commerce
```

3. Upload store product pictures into this bucket.

```sh
mc cp ~/Downloads/Product-1.jpg play/okta-commerce/
mc cp ~/Downloads/Product-2.jpg play/okta-commerce/
mc cp ~/Downloads/Product-3.jpg play/okta-commerce/
mc cp ~/Downloads/Product-4.jpg play/okta-commerce/
```

**NOTE** : We have already created a minio-store bucket on play.minio.io and copied the assets used in this example, into this bucket.


### Point to the MinIO Server with your Keys

In `services/minio-handler.js` file, update with your server's endpoint, port, access and secret keys. Keys shown in this example are open to the public:


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


### Install dependencies and run the app

To install the dependencies and start the app, run the following commands:
```
npm install
npm start
```

To see the app, open a browser window and visit http://localhost:3000.


## Help

Please post any questions as comments on the [blog post](), or visit our [Okta Developer Forums](https://devforum.okta.com/).


## License

Apache 2.0, see [LICENSE](LICENSE).
