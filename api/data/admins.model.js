'use strict';

const mongoose = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;


const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

mongoose.model('Admin', AdminSchema)
