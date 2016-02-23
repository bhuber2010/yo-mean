'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var bidSchema = new mongoose.Schema({
  name: String,
  price: Number
});

var HousesSchema = new mongoose.Schema({
  pic: String,
  name: String,
  info: String,
  active: Boolean,
  bids: [bidSchema]
});

export default mongoose.model('Houses', HousesSchema);
