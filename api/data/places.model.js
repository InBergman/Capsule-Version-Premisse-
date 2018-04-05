'use strict';

const mongoose = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const PlaceSchema = new mongoose.Schema({
  placeName: String,
  typeOfPlace: String,
  typeOfContact: String,
  height: String,
  size: String,
  capacity: String,
  userRef: {
    type: mongoObj,
    ref: 'User'
  },
  facilities: [String],
  licenses: [String],
  adress: {
    l1: String,
    l2: String,
    cp: String,
    city: String
  },
  misc: String,
  placeImages: String,
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Place', PlaceSchema)
