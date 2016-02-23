'use strict';

(function() {

  class AHouseCtrl {

    constructor($http, $scope, $stateParams, socket, Auth) {
      this.$http = $http;
      this.isLoggedIn = Auth.isLoggedIn;
      this.isAdmin = Auth.isAdmin;
      this.getCurrentUser = Auth.getCurrentUser;

      this.bids = [];

      $http.get('/api/houses/' + $stateParams.id).then(response => {
        this.house = response.data;
      });

      if (this.isAdmin()) {
        this.$http.get('/api/houses/' + $stateParams.id + '/bids').then(response => {
          this.bids = response.data;
          console.log(response.data);
          socket.syncUpdates('bids', this.bids);
        });
      };

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('bids');
      });
  }

  placeBid() {
    if (this.newBid) {
      this.$http.post('/api/houses/'+ $stateParams.id + '/bids', {bid: this.newBid});
      this.newBid = '';
    }
  }

  deleteBid(bid) {
    this.$http.delete('/api/houses/' + $stateParams.id + '/bids/' + bid._id);
  }
}

angular.module('yoMeanApp')
  .controller('AHouseCtrl', AHouseCtrl);

})();
