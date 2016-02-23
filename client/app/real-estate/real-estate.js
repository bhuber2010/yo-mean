'use strict';

angular.module('yoMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('real-estate', {
        url: '/real-estate',
        templateUrl: 'app/real-estate/real-estate.html',
        controller: 'RealEstateCtrl',
        controllerAs: 're',
        authenticate: 'user'
      });
  });
