'use strict';

angular.module('yoMeanApp.auth', [
  'yoMeanApp.constants',
  'yoMeanApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
