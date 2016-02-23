'use strict';

angular.module('yoMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('aHouse', {
        url: '/real-estate/:id',
        template: '<house-details></house-details>',
        // templateUrl: 'app/aHouse/aHouse.html',
        controller: 'AHouseCtrl',
        controllerAs: 'house',
        authenticate: 'user'
      });
  });
