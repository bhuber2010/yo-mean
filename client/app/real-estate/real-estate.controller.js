'use strict';

(function() {

  class RealEstateCtrl {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.houses = [];

      $http.get('/api/houses').then(response => {
        this.houses = response.data;
        socket.syncUpdates('houses', this.houses);
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('houses');
      });
    }

    addHouse() {
      if (this.newHouse) {
        this.$http.post('/api/houses', { name: this.newHouse.name, info: this.newHouse.info, pic: this.newHouse.pic});
        this.newHouse = '';
      }
    }

    deleteHouse(house) {
      this.$http.delete('/api/houses/' + house._id);
    }
  }

angular.module('yoMeanApp')
  .controller('RealEstateCtrl', RealEstateCtrl);

})();
