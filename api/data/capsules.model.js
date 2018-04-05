const mongoose  = require('mongoose');
const mongoObj = mongoose.Schema.Types.ObjectId;

const CapsuleSchema = new mongoose.Schema({

  name            :  String,
  artist          :  {type: [mongoObj],  ref: 'Artist',  default: null},
  artwork         :  {type: [mongoObj],  ref: 'Artwork', default: null},
  place           :  {type:  mongoObj,   ref: 'Place',   default: null},
  client          :  {type:  mongoObj,   ref: 'Client',  default: null},
  peopleInCharge  :  {type: [mongoObj],  red: 'Admin',   default: null},
  createdBy       :  {type: mongoObj,    ref: 'Admin', 	 default: null},
  type            :  {type: String,     default: ''},
  status          :  {type: String,     default: 'Incomplete'},
  cancelReason    :  {type: String,     default: ''},
  daysIntervals   :  {type: Array,      default: []},
  created         :  {type: Date,       default: Date.now},
  updated         :  {type: Date,       default: Date.now}
});

mongoose.model('Capsule', CapsuleSchema);