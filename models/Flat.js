const mongoose = require('mongoose');

const FlatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  flatname: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('flat', FlatSchema);