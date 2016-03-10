'use strict';

var app = require('../../../server');
import request from 'supertest';

var newPeople;

describe('People API:', function() {

  describe('GET /api/people', function() {
    var peoples;

    beforeEach(function(done) {
      request(app)
        .get('/api/people')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          peoples = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      peoples.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/people', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/people')
        .send({
          name: 'New People',
          info: 'This is the brand new people!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPeople = res.body;
          done();
        });
    });

    it('should respond with the newly created people', function() {
      newPeople.name.should.equal('New People');
      newPeople.info.should.equal('This is the brand new people!!!');
    });

  });

  describe('GET /api/people/:id', function() {
    var people;

    beforeEach(function(done) {
      request(app)
        .get('/api/people/' + newPeople._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          people = res.body;
          done();
        });
    });

    afterEach(function() {
      people = {};
    });

    it('should respond with the requested people', function() {
      people.name.should.equal('New People');
      people.info.should.equal('This is the brand new people!!!');
    });

  });

  describe('PUT /api/people/:id', function() {
    var updatedPeople;

    beforeEach(function(done) {
      request(app)
        .put('/api/people/' + newPeople._id)
        .send({
          name: 'Updated People',
          info: 'This is the updated people!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPeople = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPeople = {};
    });

    it('should respond with the updated people', function() {
      updatedPeople.name.should.equal('Updated People');
      updatedPeople.info.should.equal('This is the updated people!!!');
    });

  });

  describe('DELETE /api/people/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/people/' + newPeople._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when people does not exist', function(done) {
      request(app)
        .delete('/api/people/' + newPeople._id)
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
