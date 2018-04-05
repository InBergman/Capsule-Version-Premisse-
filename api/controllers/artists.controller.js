var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');
var multer = require('multer')
var ctrlUsers = require('../controllers/users.controller.js');

module.exports.artistsGetAll = function(req, res) {
  Artist
    .find()
    .populate({
      path: 'userRef',
      model: 'User'
    })
    .exec(function(err, artists) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(artists);
      }
    });
}

module.exports.artistsGetOne = function(req, res) {
  var artistId = req.params.artistId;
  Artist
    .findById(artistId)
    .populate({
      path: 'userRef',
      model: 'User'
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
          "messages": "Artist Id not found"
        };
      }
      res
        .status(response.status)
        .json(response.message)
    });
};

module.exports.removeArtist = function(req, res) {
  var artistId = req.params.artistId;
  Artist
    .findOne({
      _id: artistId
    }, function(err, artist) {
      if (err) {
        res.status(400).json(err)
      } else if (!artist) {
        res
        response.status = 404;
        response.message = {
          "messages": "Artist Id not found"
        };
      } else {
        artist.remove(function(err) {
          ctrlUsers.updateArtist({
            artist: artist,
            action: 'del'
          }, function(err, user) {
            if (err)
              res.status(400).json(err)
            res.status(201).json(artist);
          })
        })
      }
    });
}

module.exports.changeArtist = function(req, res) {
  var artistId = req.params.artistId;
  var artistUpdated = {
    artistName: req.body.artistName,
    artistForename: req.body.artistForename,
    artistSurname: req.body.artistSurname,
    numMda: req.body.numMda,
    siret: req.body.siret,
    userRef: req.body.userRef,
    artistAvatar: req.body.artistAvatar,
    statut: req.body.statut,
    univers: req.body.univers,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    console.log(req.files[0]);
    console.log("Remove old picture");
    artistUpdated.artistAvatar = '/uploads/avatars/' + req.files[0].filename;
  }
  Artist
    .findOneAndUpdate({
      '_id': artistId
    }, artistUpdated).exec(function(err, artist) {
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(artist);
      }
    });
}

module.exports.addArtist = function(req, res) {
  var newArtist = {
    artistName: req.body.artistName,
    artistForename: req.body.artistForename,
    artistSurname: req.body.artistSurname,
    numMda: req.body.numMda,
    siret: req.body.siret,
    userRef: req.body.userRef,
    artistAvatar: req.body.artistAvatar,
    statut: req.body.statut,
    univers: req.body.univers,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    console.log(req.files[0].filename);
    newArtist.artistAvatar = '/uploads/avatars/' + req.files[0].filename;
  }
  Artist
    .findOne({
      'artistName': newArtist.artistName
    }).exec(function(err, artist) {
      if (artist) {
        res.status(400).json({
          message: "Désolé, un artiste avec ce nom existe déjà."
        })
      } else if (err) {
        res.status(400).json(err)
      } else {
        Artist.create(newArtist, function(err, artist) {
          if (err) {
            res.status(400).json(err)
          } else {
            var upload = multer({}).single('avatar')
            upload(req, res, function(err) {
              if (err)
                res.status(400).json(err)
              ctrlUsers.updateArtist({
                'artist': artist,
                action: 'put'
              }, function(err, user) {
                if (err)
                  res.status(400).json(err)
                res.status(201).json(artist);
              })
            })
          }
        });
      }
    });
};
