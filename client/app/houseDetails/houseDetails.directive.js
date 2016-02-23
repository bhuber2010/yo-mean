'use strict';

angular.module('yoMeanApp')
  .directive('houseDetails', function () {
    return {
      templateUrl: 'app/houseDetails/houseDetails.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
