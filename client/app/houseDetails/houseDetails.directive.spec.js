'use strict';

describe('Directive: houseDetails', function () {

  // load the directive's module and view
  beforeEach(module('yoMeanApp'));
  beforeEach(module('app/houseDetails/houseDetails.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<house-details></house-details>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the houseDetails directive');
  }));
});
