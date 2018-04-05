var mongoose = require('mongoose');
var Capsule  = mongoose.model('Capsule');
var Artist = mongoose.model('Artist');
var Place = mongoose.model('Place');

module.exports.capsuleGetAll = function(req, res) {
  Capsule
    .find()
    .populate({ path: 'artist',     model: 'Artist'})
    .populate({ path: 'peopleInCharge',     model: 'Admin'})
    .exec(function(err, capsule) {
      if (err) {
        return res.status(500).json({
        		status: 500,
        		message: err
        	});
      } else {
        res.status(200).json(capsule);
      }
    });
};

module.exports.addCapsule = function(req, res) {
  var newCapsule = {
    name: req.body.name,
    peopleInCharge : req.body.adminId,
    type: req.body.type
  }

  Capsule
  	.findOne({
      'name': newCapsule.name
    }).exec(function(err, capsule) {
      if (capsule) {
       return res.status(400).json({
        	status: 400,
        	message: "Désolé, une capsule avec ce nom existe déjà."
        })
      } else if (err) {
        return res.status(400).json({
        		status: 400,
        		message: err
        	});
      } else {
        Capsule.create(newCapsule ,function(err, newCapsule) {
          if (err)
        	return res.status(400).json({
        		status: 400,
        		message: err
        	});
          else
        	return res.status(201).json({
        		status: 201,
        		message: "Tout OK"
        	});
        });
      }
    });
};

module.exports.capsuleGetOne = function(req, res) {
  var capsuleId = req.params.caspuleId;
  Capsule
    .findById(req.params.caspuleId)
    .populate({ path: 'user',     model: 'User'})
    .populate({ path: 'artist',     model: 'Artist'})
    .populate({ path: 'artwork',  model: 'Artwork'})
    // .populate({ path: 'place',    model: 'Place'})
    .populate({ path: 'peopleInCharge',    model: 'Admin'})
    .exec(function(err, doc) {
      var response = {
        status: 200,
        message: doc
      };
      if (err) {
        response.status = 500;
        response.message = err;
      } else if (!doc) {
        response.status = 404;
        response.message = {
          "messages": "Capsule Id not found"
        };
      }
      res
        .status(response.status)
        .json(response.message)
    });
};

module.exports.capsuleUpdate = function(req, res) {
  var response = { status: 200, message: "Is OK" };
  switch (req.body.action) {
    case 'addArtist':
    for (let i = 0; i < req.body.artistId.length; i++) {
      Artist
        .findById(req.body.artistId[i])
        .exec(function(err, artist){
          Capsule.findOneAndUpdate({ '_id': req.body.capsuleId },{ 
                                      $push: { artist: {$each: [ artist._id ]}}})
          .exec(function(err, capsule) {
            if (err) {
              response.message = "Une erreur c'est produite " + err;
              response.satus = 400;
            } else { 
              response.message = "Artist ajoute";
              response.satus = 201;
            }
          });
        });
      }
      break;
    case 'addPlace':
    console.log("Going to add place")
      for (let i = 0; i < req.body.placeId.length; i++) {
        Place
          .findById(req.body.placeId[i])
          .exec(function (err, place) {
              console.log(place);
            console.log(req.body.capsuleId)
            Capsule.findOneAndUpdate({ '_id': req.body.capsuleId }, {
              $set: { place:  place._id }
            })
              .exec(function (err, capsule) {
                if (err) {
                  response.message = "Une erreur c'est produite " + err;
                  response.satus = 400;
                } else {
                  response.message = "Lieu ajoute";
                  response.satus = 201;
                }
              });
          });
      }
      break;
    case 'capsuleCancel':
    Capsule.findOneAndUpdate({ '_id': req.body.id },
                                      {$set:{
                                        cancelReason : req.body.reason,
                                        status: 'Cancel'
                                      }})
          .exec(function(err, capsule) {
            if (err) {
              response.message = "Une erreur c'est produite " + err;
              response.satus = 400;
            } else { 
              response.message = "Artist ajoute";
              response.satus = 201;
            }
          });
      break;
    case 'capsuleUpdateGeneral':
      var conditions = { _id: req.body.capsuleId }
        , update = {
                  name: req.body.name,
                  peopleInCharge: req.body.adminId,
                  type: req.body.type 
          }
        , options = { multi: false };
      Capsule.findOne({ 'name': req.body.name }).exec(function (err, capsule) {
          if (capsule) {
            return res.status(400).json({
              status: 400,
              message: "Désolé, une capsule avec ce nom existe déjà."
            })
          } else if (err) {
            return res.status(400).json({
              status: 400,
              message: err
            });
          }
          Capsule.update(conditions, update, options, function (err, numAffected){
          })
        return res.status(201).json({
          status: 201,
          message: "okok"
        });
        })
    break;
    case 'deleteArtist':
      Artist
        .findById(req.body.artistId)
        .exec(function(err, artist){
          Capsule.findOneAndUpdate({ '_id': req.body.capsuleId },{ 
                                      $pull: { artist: req.body.artistId }})
          .exec(function(err, capsule) {
            if (err) {
              response.message = "Une erreur c'est produite " + err;
              response.satus = 400;
            } else { 
              response.message = 'Artist as been deleted';
              response.satus = 201;
            }
          });
        });
      case 'updateArtist':
        response.message = 'Artist as been updated';
        break;
      res
        .status(response.status)
        .json(response.message)
    }
}

module.exports.capsuleAddCreneaux = function(req, res) {
  var response = { status: 200, message: "Is OK" };
  var creneaux = req.body;
  console.log(req.body);
  console.log(req.body[1].id)
  Capsule.findOneAndUpdate({ '_id': req.body[req.body.length - 1].id},
                          {$set: {daysIntervals: { creneaux}}})
  .exec(function(err, capsule) {
    if (err) {
      response.message = "Une erreur c'est produite " + err;
      response.satus = 400;
    } else { 
      response.message = "Creneaux ajoute";
      response.satus = 201;
    }
 })
}