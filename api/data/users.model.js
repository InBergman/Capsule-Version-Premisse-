'use strict';

const mongoose = require('mongoose');
var Artist = mongoose.model('Artist');
var Place = mongoose.model('Place');
var Client = mongoose.model('Client');
var Collective = mongoose.model('Collective');
const mongoObj = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  userSurname: {
    type: String,
    required: true
  },
  userForename: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  userPhone: {
    type: String,
    unique: true,
    required: true
  },
  userAvatar: {
    type: String,
    required: true
  },
  status: {
    isArtist: {
      type: Boolean,
      default: false
    },
    isPlace: {
      type: Boolean,
      default: false
    },
    isClient: {
      type: Boolean,
      default: false
    },
    isCollective: {
      type: Boolean,
      default: false
    },
    hasCapsule: {
      type: Boolean,
      default: false
    }
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  artist: {
    type: mongoObj,
    ref: 'Artist'
  },
  place: {
    type: mongoObj,
    ref: 'Place'
  },
  client: {
    type: mongoObj,
    ref: 'Client'
  },
  collective: {
    type: mongoObj,
    ref: 'Collective'
  }
});

UserSchema.pre('remove', function(next) {
  Artist.remove({
    _id: this.artist
  }).exec(next);
  Place.remove({
    _id: this.place
  }).exec(next);
  Client.remove({
    _id: this.client
  }).exec(next);
  Collective.remove({
    _id: this.collective
  }).exec(next);
});

mongoose.model('User', UserSchema)
