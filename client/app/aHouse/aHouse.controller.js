'use strict';

(function() {

  class AHouseCtrl {

    constructor($http, $scope, $stateParams, socket, Auth) {
      this.$http = $http;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.houseID = $stateParams.id;

      this.bids = [];

      $http.get('/api/houses/' + $stateParams.id).then(response => {
        console.log(response.data);
        this.house = response.data;
        if (this.isAdmin()) {
          this.bids = response.data.bids;
          socket.syncUpdates('bids', this.bids);
        }
      });

      // if (this.isAdmin()) {
      //   this.$http.get('/api/houses/' + $stateParams.id + '/bids').then(response => {
      //     this.bids = response.data;
      //     console.log(response.data);
      //     socket.syncUpdates('bids', this.bids);
      //   });
      // };

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('bids');
      });
  }

  placeBid() {
    if (this.newBid) {
      this.$http.put('/api/houses/'+ this.houseID, {name: this.newBid.name, price: this.newBid.price});
      this.newBid.name = '';
      this.newBid.price = '';
    }
  }

  // deleteBid(bid) {
  //   this.$http.delete('/api/houses/' + $stateParams.id + '/bids/' + bid._id);
  // }
}

angular.module('yoMeanApp')
  .controller('AHouseCtrl', AHouseCtrl);

})();
