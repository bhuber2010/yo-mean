'use strict';

describe('Controller: RealEstateCtrl', function () {

  // load the controller's module
  beforeEach(module('yoMeanApp'));

  var RealEstateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RealEstateCtrl = $controller('RealEstateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
