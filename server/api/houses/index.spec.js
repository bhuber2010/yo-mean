'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var housesCtrlStub = {
  index: 'housesCtrl.index',
  show: 'housesCtrl.show',
  create: 'housesCtrl.create',
  update: 'housesCtrl.update',
  destroy: 'housesCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var housesIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './houses.controller': housesCtrlStub
});

describe('Houses API Router:', function() {

  it('should return an express router instance', function() {
    housesIndex.should.equal(routerStub);
  });

  describe('GET /api/housess', function() {

    it('should route to houses.controller.index', function() {
      routerStub.get
        .withArgs('/', 'housesCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/housess/:id', function() {

    it('should route to houses.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'housesCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/housess', function() {

    it('should route to houses.controller.create', function() {
      routerStub.post
        .withArgs('/', 'housesCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/housess/:id', function() {

    it('should route to houses.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'housesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/housess/:id', function() {

    it('should route to houses.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'housesCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/housess/:id', function() {

    it('should route to houses.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'housesCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
