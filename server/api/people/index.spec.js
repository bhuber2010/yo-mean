'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var peopleCtrlStub = {
  index: 'peopleCtrl.index',
  show: 'peopleCtrl.show',
  create: 'peopleCtrl.create',
  update: 'peopleCtrl.update',
  destroy: 'peopleCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var peopleIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './people.controller': peopleCtrlStub
});

describe('People API Router:', function() {

  it('should return an express router instance', function() {
    peopleIndex.should.equal(routerStub);
  });

  describe('GET /api/people', function() {

    it('should route to people.controller.index', function() {
      routerStub.get
        .withArgs('/', 'peopleCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/people/:id', function() {

    it('should route to people.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'peopleCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/people', function() {

    it('should route to people.controller.create', function() {
      routerStub.post
        .withArgs('/', 'peopleCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/people/:id', function() {

    it('should route to people.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'peopleCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/people/:id', function() {

    it('should route to people.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'peopleCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/people/:id', function() {

    it('should route to people.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'peopleCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
