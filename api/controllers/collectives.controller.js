var mongoose = require('mongoose');
var Collective = mongoose.model('Collective');
var multer = require('multer')
var ctrlUsers = require('../controllers/users.controller.js');

module.exports.changeCollective = function(req, res) {
  var collectiveId = req.params.collectiveId;
  var collectiveUpdated = {
    collectiveName: req.body.collectiveName,
    userRef: req.body.userRef,
    siret: req.body.siret,
    univers: req.body.univers,
    size: req.body.size,
    typeOfContact: req.body.typeOfContact,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    collectiveUpdated.collectiveAvatar = '/uploads/collectifs/' + req.files[0].filename;
  }
  Collective
    .findOneAndUpdate({
      '_id': collectiveId
    }, collectiveUpdated).exec(function(err, collective) {
      console.log(collective);
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(collective);
      }
    });
}

module.exports.removeCollective = function(req, res) {
  var collectiveId = req.params.collectiveId;
  Collective
    .findOne({
      _id: collectiveId
    }, function(err, collective) {
      if (err) {
        res.status(400).json(err)
      } else if (!collective) {
        res
        response.status = 404;
        response.message = {
          "messages": "Collective Id not found"
        };
      } else {
        collective.remove(function(err) {
          ctrlUsers.updateCollective({
            collective: collective,
            action: 'del'
          }, function(err, user) {
            if (err)
              res.status(400).json(err)
            res.status(201).json(collective);
          })
        })
      }
    });
}

module.exports.collectivesGetAll = function(req, res) {
  Collective
    .find()
    .populate({
      path: 'userRef',
      model: 'User'
    })
    .exec(function(err, collectives) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(collectives);
      }
    });
}
module.exports.addCollective = function(req, res) {
  var newCollective = {
    collectiveName: req.body.collectiveName,
    userRef: req.body.userRef,
    siret: req.body.siret,
    univers: req.body.univers,
    size: req.body.size,
    typeOfContact: req.body.typeOfContact,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    newCollective.collectiveAvatar = '/uploads/collectifs/' + req.files[0].filename;
  }
  Collective
    .findOne({
      'collectiveName': newCollective.collectiveName
    }).exec(function(err, collective) {
      if (collective) {
        res.status(400).json({
          message: "Désolé, un collective avec ce nom existe déjà."
        })
      } else if (err) {
        res.status(400).json(err)
      } else {
        Collective.create(newCollective, function(err, collective) {
          if (err) {
            res.status(400).json(err)
          } else {
            var upload = multer({}).single('collectiveAvatar')
            upload(req, res, function(err) {
              if (err)
                res.status(400).json(err)
              ctrlUsers.updateCollective({
                'collective': collective,
                action: 'put'
              }, function(err, user) {
                if (err)
                  res.status(400).json(err)
                res.status(201).json(collective);
              })
            })
          }
        });
      }
    });
};
