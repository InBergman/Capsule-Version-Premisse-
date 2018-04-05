var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://admin:admin@ds145312.mlab.com:45312/site_v1';

var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, db) {
    if (err)
    {
        console.log("DB connection failed");
        return ;
    }
    _connection  = db;
    console.log("DB connection open", db);
  });
}

var get = function() {
  return _connection;
}

module.exports = {
  open: open,
  get : get
};
