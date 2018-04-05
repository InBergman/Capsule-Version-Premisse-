'use strict';

const mongoose = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const AdressSchema = new mongoose.Schema({
  l1: String,
  l2: String,
  cp: String,
  city: String
})

const ArtistSchema = new mongoose.Schema({
  artistName: {
    type: String
  },
  artistForename: {
    type: String
  },
  artistSurname: {
    type: String
  },
  numMda: {
    type: String
  },
  statut: {
    type: String
  },
  univers: {
    type: String
  },
  siret: {
    type: String
  },
  artistAvatar: {
    type: String
  },
  adress: {
    l1: String,
    l2: String,
    cp: String,
    city: String
  },
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
mongoose.model('Adress', AdressSchema)
mongoose.model('Artist', ArtistSchema)
