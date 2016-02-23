'use strict';

describe('Controller: AHouseCtrl', function () {

  // load the controller's module
  beforeEach(module('yoMeanApp'));

  var AHouseCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AHouseCtrl = $controller('AHouseCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
