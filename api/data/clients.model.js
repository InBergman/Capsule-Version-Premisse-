'use strict';

const mongoose = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const ClientSchema = new mongoose.Schema({
  clientName: String,
  adress: {
    l1: String,
    l2: String,
    cp: String,
    city: String
  },
  clientAvatar: String,
  presta: String,
  siret: String,
  userRef: {
    type: mongoObj,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Client', ClientSchema)
