require('./api/data/_db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path')
var routes = require('./api/routes');

// Define the port to run on
app.set('port', 3000);

// Add middleware to console log every request
app.use(function(req, res, next) {
  // console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var path = './public/uploads';
    console.log(file.fieldname);
    if (file.fieldname == 'avatar')
      path = './public/uploads/avatars';
    else if (file.fieldname == 'placeImages')
      path += '/lieux'
    else if (file.fieldname == 'clientImages')
      path += '/clients'
    cb(null, path)
  },
  filename: function(req, file, cb) {
    var filename = ''
    if (file.fieldname == 'avatar')
      filename = 'avatar'
    else if (file.fieldname == 'placeImages')
      filename = 'lieux'
    else if (file.fieldname == 'clientImages')
      filename = 'client'
    cb(null, filename + '-' + Date.now() + path.extname(file.originalname))
  }
})

app.use(multer({
  storage: storage
}).any());

// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
