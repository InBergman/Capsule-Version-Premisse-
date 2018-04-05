angular.module('capsule')
  .directive('clientForm', clientForm);

function clientForm() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      disabled: '=',
      user: '='
    },
    templateUrl: 'angular-app/directives/forms/client-form/client-form-directive.html',
    controller: 'ClientForm',
    controllerAs: 'vm'
  };
}
