'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var PeopleSchema = new mongoose.Schema({
  pic: String,
  name: String,
  info: String,
});

export default mongoose.model('People', PeopleSchema);
