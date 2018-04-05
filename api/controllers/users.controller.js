var mongoose = require('mongoose');
var User = mongoose.model('User');
var multer = require('multer');

var clearUserRefs = function(user) {
  console.log(user);
}

module.exports.updateArtist = function(obj, callback) {
  if (obj.action == 'del') {
    User
      .findOneAndUpdate({
        '_id': obj.artist.userRef
      }, {
        $set: {
          'status.isArtist': false,
          artist: undefined
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  } else {
    User
      .findOneAndUpdate({
        '_id': obj.artist.userRef
      }, {
        $set: {
          'status.isArtist': true,
          artist: obj.artist.id
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  }
}

module.exports.updateClient = function(obj, callback) {
  if (obj.action == 'del') {
    User
      .findOneAndUpdate({
        '_id': obj.client.userRef
      }, {
        $set: {
          'status.isClient': false,
          client: undefined
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  } else {
    User
      .findOneAndUpdate({
        '_id': obj.client.userRef
      }, {
        $set: {
          'status.isClient': true,
          client: obj.client.id
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  }
}

module.exports.updateCollective = function(obj, callback) {
  if (obj.action == 'del') {
    User
      .findOneAndUpdate({
        '_id': obj.collective.userRef
      }, {
        $set: {
          'status.isCollective': false,
          collective: undefined
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  } else {
    User
      .findOneAndUpdate({
        '_id': obj.collective.userRef
      }, {
        $set: {
          'status.isCollective': true,
          collective: obj.collective.id
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  }
}

module.exports.updatePlace = function(obj, callback) {
  console.log(obj);
  if (obj.action == 'del') {
    User
      .findOneAndUpdate({
        '_id': obj.place.userRef
      }, {
        $set: {
          'status.isPlace': false,
          place: undefined
        }
      }).exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  } else {
    User
      .findOneAndUpdate({
        '_id': obj.place.userRef
      }, {
        $set: {
          'status.isPlace': true,
          place: obj.place.id
        }
      })
      .exec(function(err, user) {
        if (err) {
          callback(error);
        } else {
          callback(null, user);
        }
      });
  }
}

module.exports.usersGetAll = function(req, res) {
  User
    .find()
    .populate({
      path: 'artist',
      model: 'Artist'
    })
    .populate({
      path: 'place',
      model: 'Place'
    })
    .populate({
      path: 'client',
      model: 'Client'
    })
    .populate({
      path: 'collective',
      model: 'Collective'
    })
    .exec(function(err, users) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(users);
      }
    });
};

module.exports.usersGetOne = function(req, res) {
  var userId = req.params.userId;
  User
    .findById(userId)
    .populate({
      path: 'artist',
      model: 'Artist'
    })
    .populate({
      path: 'place',
      model: 'Place'
    })
    .populate({
      path: 'client',
      model: 'Client'
    })
    .populate({
      path: 'collective',
      model: 'Collective'
    })
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        res
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res
        response.status = 404;
        response.message = {
          "messages": "User Id not found"
        };
      }
      res
        .status(response.status)
        .json(response.message)
    });
};

module.exports.changeUser = function(req, res) {
  var userId = req.params.userId;
  var userUpdated = {
    userForename: req.body.userForename,
    userSurname: req.body.userSurname,
    userEmail: req.body.userEmail,
    userPhone: req.body.userPhone,
    userAvatar: req.body.userAvatar
  }
  // console.log(req.files[0]);
  if (req.files[0] != undefined) {
    console.log("Remove old picture");
    userUpdated.userAvatar = '/uploads/avatars/' + req.files[0].filename;
  }

  User
    .findOneAndUpdate({
      '_id': userId
    }, userUpdated).exec(function(err, user) {
      if (err) {
        console.log("error");
        res.status(400).json(err)
      } else {
        res.status(201).json(user);
      }
    });
};

module.exports.removeUser = function(req, res) {
  var userId = req.params.userId;

  User
    .findById(userId)
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        res
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        res
        response.status = 404;
        response.message = {
          "messages": "User Id not found"
        };
      }
      doc.remove({
        id: userId
      }, function(err, user) {
        if (err) {
          res.status(400).json(err)
        } else {
          res.status(201).json(user);
        }
      })
    })
}

// User.findById(userId, function (err, doc)
// User
//   .remove({
//     _id: userId
//   }, function(err, user) {
//     console.log("user.artist");
//     if (err) {
//       res.status(400).json(err)
//     } else {
//       res.status(201).json(user);
//     }
//   });
// }

module.exports.addUser = function(req, res) {

  var newUser = {
    userForename: req.body.userForename,
    userSurname: req.body.userSurname,
    userEmail: req.body.userEmail,
    userPhone: req.body.userPhone,
    userAvatar: '/uploads/avatars/' + req.files[0].filename
  }

  User
    .findOne({
      'userEmail': newUser.userEmail
    }).exec(function(err, user) {

      if (user) {
        res.status(400).json({
          message: "Désolé, un utilisateur avec ce nom existe déjà."
        })
      } else if (err) {
        res.status(400).json(err)
      } else {
        User.create(newUser, function(err, user) {
          if (err) {
            res.status(400).json(err)
          } else {
            var upload = multer({}).single('avatar')
            upload(req, res, function(err) {
              if (err)
                res.status(400).json(err)
              res.status(201).json(user);
            })
          }
        });
      }
    });
};

//
// module.exports.login = function(req, res) {
//   console.log('loggin in user');
//
//   var username = req.body.username;
//   var password = req.body.password;
//
//   User.findOne({
//     username: username
//   }).exec(function(err, user) {
//     if (err) {
//       console.log(err);
//       res.status(400).json(err);
//     } else if (!user) {
//       res.status(404).json({
//         "messages": "User Id not found"
//       });
//     } else {
//       console.log(user);
//       if (bcrypt.compareSync(password, user.password)) {
//         var token = jwt.sign({
//           username: user.username
//         }, 's3cr3t', {
//           expiresIn: 3600
//         });
//         res.status(200).json({
//           success: true,
//           token: token
//         });
//       } else {
//         res.status(401).json("Unauthorized");
//       }
//     }
//   })
// };
//
// module.exports.authenticate = function(req, res, next) {
//   var headerExists = req.header.authorization;
//
//   if (headerExists) {
//     var token = req.headers.authorization.split('')[1];
//     jwt.verify(token, 's3cr3t', function(err, decoded) {
//       if (err) {
//         console.log(err);
//         res.status(401).json("Unauthorized");
//       } else {
//         req.user = decoded.username;
//         next();
//       }
//     })
//   } else {
//     res.status(403).json('No token provided');
//   }
// };
