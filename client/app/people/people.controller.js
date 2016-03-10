'use strict';

  (function() {

    class PeopleCtrl {

      constructor($http, $scope, socket, Auth) {
        this.$http = $http;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;

        this.people = [];

        $http.get('/api/people').then(response => {
          this.people = response.data;
          socket.syncUpdates('people', this.people);
        });

        $scope.$on('$destroy', function() {
          socket.unsyncUpdates('people');
        });
      }

      addPerson(person) {
        if (this.newPerson) {
          this.$http.post('/api/people', { name: this.newPerson.name, info: this.newPerson.info, pic: this.newPerson.pic});
          this.newPerson = '';
        }
      }

      editPerson(person, data) {
        if (person) {
          this.$http.put('/api/people/' + person._id, { name: person.name, info: person.info, pic: person.pic});
        }
      }

      deletePerson(person) {
        this.$http.delete('/api/people/' + person._id);
      }
    }

  angular.module('yoMeanApp')
    .controller('PeopleCtrl', PeopleCtrl);

  })();
