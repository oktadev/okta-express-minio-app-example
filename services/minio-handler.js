var Minio = require('minio');

// Instantiate a minioClient Object with an endPoint, port & keys.
// This minio server runs locally. 
var minioClient = new Minio.Client({
    endPoint: 'play.minio.io',
    port: 9000,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
    useSSL: true
});
  
var minioBucket = 'okta-commerce'

var assets = [];
var objectsStream = minioClient.listObjects(minioBucket, '', true)
objectsStream.on('data', function(obj) {
    var publicUrl = minioClient.protocol + '//' + minioClient.host + ':' + minioClient.port + '/' + minioBucket + '/' + obj.name
    assets.push(publicUrl);
});
objectsStream.on('error', function(e) {
    console.log(e);
});
objectsStream.on('end', function(e) {
    return assets
});

module.exports = assets;
