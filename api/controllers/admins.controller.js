var mongoose = require('mongoose');
var Admin = mongoose.model('Admin');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

module.exports.adminsGetAll = function(req, res) {

  var offset = 0;
  var count = 5;
  var maxCount = 10;

  if (req.query && req.query.offset)
    offset = parseInt(req.query.offset, 10);
  if (req.query && req.query.count)
    count = parseInt(req.query.count, 10);
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message": "Error : offset or count should be Numbers"
      })
    return;
  }
  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message": "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Admin
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, admins) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(admins);
      }
    });

}
module.exports.register = function(req, res) {
  console.log('registering user');

  var username = req.body.username;
  var password = req.body.password;
  var userEmail = req.body.userEmail;

  Admin.create({
    username: username,
    userEmail: userEmail,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log('user created', user);
      res.status(201).json(user);
    }
  });
};

module.exports.login = function(req, res) {
  console.log('loggin in user');

  var userEmail = req.body.userEmail;
  var password = req.body.password;

  Admin.findOne({
    userEmail: userEmail
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else if (!user) {
      res.status(404).json({
        "messages": "Admin Id not found"
      });
    } else {
      console.log(user);
      if (bcrypt.compareSync(password, user.password)) {
        var token = jwt.sign({
          username: user.username,
          type: "admin"
        }, 's3cr3t', {
          expiresIn: 3600
        });
        res.status(200).json({
          success: true,
          token: token
        });
      } else {
        res.status(401).json("Unauthorized");
      }
    }
  })
};

module.exports.authenticate = function(req, res, next) {
  var headerExists = req.header.authorization;

  if (headerExists) {
    var token = req.headers.authorization.split('')[1];
    jwt.verify(token, 's3cr3t', function(err, decoded) {
      if (err) {
        console.log(err);
        res.status(401).json("Unauthorized");
      } else {
        req.user = decoded.username;
        next();
      }
    })
  } else {
    res.status(403).json('No token provided');
  }

}
