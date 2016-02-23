'use strict';

var express = require('express');
var controller = require('./houses.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/bids', controller.getBids);
router.post('/', controller.create);
// router.post('/:id/bids', controller.postBid);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
// router.delete('/:id/bids/:bidID', controller.destroyBid);

module.exports = router;
