angular.module('capsule')
  .directive('collectiveForm', collectiveForm);

function collectiveForm() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      disabled: '=',
      user: '='
    },
    templateUrl: 'angular-app/directives/forms/collective-form/collective-form-directive.html',
    controller: 'CollectiveForm',
    controllerAs: 'vm'
  };
}
