var mongoose = require('mongoose');

var dburl = 'mongodb://admin:admin@ds145312.mlab.com:45312/site_v1';

mongoose.connect(dburl);

mongoose.connection.on('connected', function() {
  console.log("Mongoose connected to " + dburl);
});

mongoose.connection.on('disconnected', function() {
  console.log("Mongoose disconnected");
});

mongoose.connection.on('error', function(err) {
  console.log("Mongoose connection error : " + err);
});

process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected trough app termination()");
    process.exit(0);
  });
});

process.on('SIGTERNM', function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected trough app termination()");
    process.exit(0);
  });
});

process.once('SIGUSR2', function() {
  mongoose.connection.close(function() {
    console.log("Mongoose disconnected trough app termination()");
    process.kill(process.pid, 'SIGUSR2');
  });
});

// BRING IN SCHEMAS AND MODELS
require('./admins.model.js');
require('./artists.model.js');
require('./artworks.model.js');
require('./clients.model.js');
require('./collectives.model.js');
require('./places.model.js');
require('./users.model.js');
require('./capsules.model.js');
