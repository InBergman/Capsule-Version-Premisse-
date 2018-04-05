var mongoose = require('mongoose');
var Place = mongoose.model('Place');
var multer = require('multer')
var ctrlUsers = require('../controllers/users.controller.js');

module.exports.placesGetAll = function(req, res) {
  Place
    .find()
    .populate({
      path: 'userRef',
      model: 'User'
    })
    .exec(function(err, places) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(places);
      }
    });
}

module.exports.changePlace = function(req, res) {

  var placeId = req.params.placeId;
  var placeUpdated = {
    placeName: req.body.placeName,
    typeOfPlace: req.body.typeOfPlace,
    typeOfContact: req.body.typeOfContact,
    height: req.body.height,
    size: req.body.size,
    capacity: req.body.capacity,
    userRef: req.body.userRef,
    facilities: (req.body.facilities).split(","),
    licenses: (req.body.licenses).split(","),
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    },
    misc: req.body.misc,
    placeImages: req.body.placeImages
  }
  if (req.files[0] != undefined) {
    console.log(req.files[0]);
    console.log("Remove old picture");
    placeUpdated.placeImages = '/uploads/lieux/' + req.files[0].filename;
  }
  Place
    .findOneAndUpdate({
      '_id': placeId
    }, placeUpdated).exec(function(err, place) {
      console.log(place);
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(place);
      }
    });
}

module.exports.removePlace = function(req, res) {
  var placeId = req.params.placeId;
  Place
    .findOne({
      _id: placeId
    }, function(err, place) {
      if (err) {
        res.status(400).json(err)
      } else if (!place) {
        res
        response.status = 404;
        response.message = {
          "messages": "Place Id not found"
        };
      } else {
        place.remove(function(err) {
          ctrlUsers.updatePlace({
            place: place,
            action: 'del'
          }, function(err, user) {
            if (err)
              res.status(400).json(err)
            res.status(201).json(place);
          })
        })
      }
    });
}

module.exports.addPlace = function(req, res) {
  var newPlace = {
    placeName: req.body.placeName,
    typeOfPlace: req.body.typeOfPlace,
    typeOfContact: req.body.typeOfContact,
    height: req.body.height,
    size: req.body.size,
    capacity: req.body.capacity,
    userRef: req.body.userRef,
    facilities: (req.body.facilities).split(","),
    licenses: (req.body.licenses).split(","),
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    },
    misc: req.body.misc,
    placeImages: req.body.placeImages
  }
  if (req.files[0] != undefined) {
    console.log(req.files[0]);
    console.log("Remove old picture");
    newPlace.placeImages = '/uploads/lieux/' + req.files[0].filename;
  }
  Place
    .findOne({
      'placeName': newPlace.placeName
    }).exec(function(err, place) {
      if (place) {
        res.status(400).json({
          message: "Désolé, un lieux avec ce nom existe déjà."
        })
      } else if (err) {
        res.status(400).json(err)
      } else {
        Place.create(newPlace, function(err, place) {
          if (err) {
            res.status(400).json(err)
          } else {
            var upload = multer({}).single('placeImages')
            upload(req, res, function(err) {
              if (err)
                res.status(400).json(err)
              ctrlUsers.updatePlace({
                'place': place,
                action: 'put'
              }, function(err, user) {
                if (err)
                  res.status(400).json(err)
                res.status(201).json(place);
              })
            })
          }
        });
      }
    });
};
