var mongoose = require('mongoose');
var Client = mongoose.model('Client');
var multer = require('multer')
var ctrlUsers = require('../controllers/users.controller.js');

module.exports.changeClient = function(req, res) {
  var clientId = req.params.clientId;
  var clientUpdated = {
    clientName: req.body.clientName,
    userRef: req.body.userRef,
    presta: req.body.presta,
    siret: req.body.siret,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    clientUpdated.clientImages = '/uploads/clients/' + req.files[0].filename;
  }
  Client
    .findOneAndUpdate({
      '_id': clientId
    }, clientUpdated).exec(function(err, client) {
      console.log(client);
      if (err) {
        res.status(400).json(err)
      } else {
        res.status(201).json(client);
      }
    });
}

module.exports.removeClient = function(req, res) {
  var clientId = req.params.clientId;
  Client
    .findOne({
      _id: clientId
    }, function(err, client) {
      if (err) {
        res.status(400).json(err)
      } else if (!client) {
        res
        response.status = 404;
        response.message = {
          "messages": "Client Id not found"
        };
      } else {
        client.remove(function(err) {
          ctrlUsers.updateClient({
            client: client,
            action: 'del'
          }, function(err, user) {
            if (err)
              res.status(400).json(err)
            res.status(201).json(client);
          })
        })
      }
    });
}

module.exports.clientsGetAll = function(req, res) {
  Client
    .find()
    .populate({
      path: 'userRef',
      model: 'User'
    })
    .exec(function(err, clients) {
      if (err) {
        res
          .status(500)
          .json(err);
      } else {
        res
          .status(200)
          .json(clients);
      }
    });
}

module.exports.addClient = function(req, res) {
  var newClient = {
    clientName: req.body.clientName,
    userRef: req.body.userRef,
    presta: req.body.presta,
    siret: req.body.siret,
    adress: {
      l1: req.body.l1,
      l2: req.body.l2,
      city: req.body.city,
      cp: req.body.cp
    }
  }
  if (req.files[0] != undefined) {
    newClient.clientImages = '/uploads/clients/' + req.files[0].filename;
  }
  Client
    .findOne({
      'clientName': newClient.clientName
    }).exec(function(err, client) {
      if (client) {
        res.status(400).json({
          message: "Désolé, un client avec ce nom existe déjà."
        })
      } else if (err) {
        res.status(400).json(err)
      } else {
        Client.create(newClient, function(err, client) {
          if (err) {
            res.status(400).json(err)
          } else {
            var upload = multer({}).single('clientImages')
            upload(req, res, function(err) {
              if (err)
                res.status(400).json(err)
              ctrlUsers.updateClient({
                'client': client,
                action: 'put'
              }, function(err, user) {
                if (err)
                  res.status(400).json(err)
                res.status(201).json(client);
              })
            })
          }
        });
      }
    });
};
