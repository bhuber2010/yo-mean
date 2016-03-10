'use strict';

angular.module('yoMeanApp', [
  'yoMeanApp.auth',
  'yoMeanApp.admin',
  'yoMeanApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'xeditable'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  .run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });
