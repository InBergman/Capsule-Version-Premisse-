angular.module('capsule')
  .directive('placeForm', placeForm);

function placeForm() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      disabled: '=',
      user: '='
    },
    templateUrl: 'angular-app/directives/forms/place-form/place-form-directive.html',
    controller: 'PlaceForm',
    controllerAs: 'vm'
  };
}
