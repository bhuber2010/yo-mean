/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/houses              ->  index
 * POST    /api/houses              ->  create
 * GET     /api/houses/:id          ->  show
 * PUT     /api/houses/:id          ->  update
 * DELETE  /api/houses/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Houses from './houses.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var bid = entity.bids.push(updates)
    var updated = _.merge(entity, bid);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Houses
export function index(req, res) {
  Houses.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single House from the DB
export function show(req, res) {
  Houses.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets Bids on a single House
// export function getBids(req, res) {
//   var house = req.params.id;
//   Houses.findByIdAsync()
//     .then(house => {
//       console.log(house);
//     })
//     .then(respondWithResult(res))
//     .catch(handleError(res));
// }

// Creates a new House in the DB
export function create(req, res) {
  Houses.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing House in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Houses.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a House from the DB
export function destroy(req, res) {
  Houses.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
