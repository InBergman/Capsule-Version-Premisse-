'use strict';

const mongoose  = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const ArtworkSchema = new mongoose.Schema({
  name       : String,
  imagesRef  : [{type: mongoObj, ref:'Image'}],
  artistsRef : [{type: mongoObj, ref:'Artist'}],
  created    : {type: Date, default: Date.now},
  updated    : {type: Date, default: Date.now}
});

mongoose.model('Artwork', ArtworkSchema)
