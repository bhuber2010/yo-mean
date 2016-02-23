'use strict';

var app = require('../..');
import request from 'supertest';

var newHouses;

describe('Houses API:', function() {

  describe('GET /api/housess', function() {
    var housess;

    beforeEach(function(done) {
      request(app)
        .get('/api/housess')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          housess = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      housess.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/housess', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/housess')
        .send({
          name: 'New Houses',
          info: 'This is the brand new houses!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newHouses = res.body;
          done();
        });
    });

    it('should respond with the newly created houses', function() {
      newHouses.name.should.equal('New Houses');
      newHouses.info.should.equal('This is the brand new houses!!!');
    });

  });

  describe('GET /api/housess/:id', function() {
    var houses;

    beforeEach(function(done) {
      request(app)
        .get('/api/housess/' + newHouses._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          houses = res.body;
          done();
        });
    });

    afterEach(function() {
      houses = {};
    });

    it('should respond with the requested houses', function() {
      houses.name.should.equal('New Houses');
      houses.info.should.equal('This is the brand new houses!!!');
    });

  });

  describe('PUT /api/housess/:id', function() {
    var updatedHouses;

    beforeEach(function(done) {
      request(app)
        .put('/api/housess/' + newHouses._id)
        .send({
          name: 'Updated Houses',
          info: 'This is the updated houses!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedHouses = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHouses = {};
    });

    it('should respond with the updated houses', function() {
      updatedHouses.name.should.equal('Updated Houses');
      updatedHouses.info.should.equal('This is the updated houses!!!');
    });

  });

  describe('DELETE /api/housess/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/housess/' + newHouses._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when houses does not exist', function(done) {
      request(app)
        .delete('/api/housess/' + newHouses._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
