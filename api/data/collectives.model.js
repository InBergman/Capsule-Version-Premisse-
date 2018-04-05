'use strict';

const mongoose = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const CollectiveSchema = new mongoose.Schema({
  collectiveName: String,
  siret: String,
  univers: String,
  size: String,
  typeOfContact: String,
  adress: {
    l1: String,
    l2: String,
    cp: String,
    city: String
  },
  collectiveAvatar: String,
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

mongoose.model('Collective', CollectiveSchema)
