'use strict';

angular.module('yoMeanApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/people/people.html',
        controller: 'PeopleCtrl',
        controllerAs: 'people',
        authenticate: 'user'
      });
  });
