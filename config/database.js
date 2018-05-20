/*
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://dsyncadmin:doyouknowthemuffinman@cluster0-5clo4.mongodb.net/test?retryWrites=true";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});
*/

module.exports = {
  database: 'mongodb+srv://dsyncadmin:doyouknowthemuffinman@cluster0-5clo4.mongodb.net/test?retryWrites=true',
  //database: 'mongodb://localhost:27017/pisig',
  secret: 'tempSec'
}
