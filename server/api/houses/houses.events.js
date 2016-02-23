/**
 * Houses model events
 */

'use strict';

import {EventEmitter} from 'events';
var Houses = require('./houses.model');
var HousesEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HousesEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Houses.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HousesEvents.emit(event + ':' + doc._id, doc);
    HousesEvents.emit(event, doc);
  }
}

export default HousesEvents;
