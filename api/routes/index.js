var express = require('express');
var router = express.Router()

var ctrlPlaces = require('../controllers/places.controller.js');
var ctrlAdmins = require('../controllers/admins.controller.js');
var ctrlArtists = require('../controllers/artists.controller.js');
// var ctrlArtworks = require('../controllers/artworks.controller.js');
var ctrlClients = require('../controllers/clients.controller.js');
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlCollectives = require('../controllers/collectives.controller.js');
var ctrlCapsules = require('../controllers/capsules.controller.js');

// CAPSULES ROUTES

router
  .route('/capsules/:caspuleId')
  .get(ctrlCapsules.capsuleGetOne)
  .post(ctrlCapsules.capsuleAddCreneaux)
  .put(ctrlCapsules.capsuleUpdate)
router
  .route('/capsules')
  .get(ctrlCapsules.capsuleGetAll)
  .post(ctrlCapsules.addCapsule)
  .put(ctrlCapsules.capsuleUpdate)

//USERS
router
  .route('/users')
  .get(ctrlUsers.usersGetAll)
  .post(ctrlUsers.addUser);
router
  .route('/users/:userId')
  .get(ctrlUsers.usersGetOne)
  .put(ctrlUsers.changeUser)
  .delete(ctrlUsers.removeUser);

// ARTISTS
router
  .route('/artistes/')
  .get(ctrlArtists.artistsGetAll)
  .post(ctrlArtists.addArtist);
router
  .route('/artistes/:artistId')
  .delete(ctrlArtists.removeArtist)
  .put(ctrlArtists.changeArtist);

// PLACES
router
  .route('/lieux/')
  .get(ctrlPlaces.placesGetAll)
  .post(ctrlPlaces.addPlace);
router
  .route('/lieux/:placeId')
  .delete(ctrlPlaces.removePlace)
  .put(ctrlPlaces.changePlace);

// CLIENTS
router
  .route('/clients/')
  .get(ctrlClients.clientsGetAll)
  .post(ctrlClients.addClient);
router
  .route('/clients/:clientId')
  .delete(ctrlClients.removeClient)
  .put(ctrlClients.changeClient);

// COLLECTIVES
router
  .route('/collectifs/')
  .get(ctrlCollectives.collectivesGetAll)
  .post(ctrlCollectives.addCollective);
router
  .route('/collectifs/:collectiveId')
  .delete(ctrlCollectives.removeCollective)
  .put(ctrlCollectives.changeCollective);

// ADMIN ROUTES
router
  .route('/admins')
  .get(ctrlAdmins.adminsGetAll)
  // .get(ctrlAdmins.currentAdmin);
  .post(ctrlAdmins.register);

// Authenfication
router
  .route('/register')
  .post(ctrlAdmins.register);
router
  .route('/login')
  .post(ctrlAdmins.login);

module.exports = router;
