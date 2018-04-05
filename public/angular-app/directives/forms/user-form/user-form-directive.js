angular.module('capsule')
  .directive('userForm', userForm);

function userForm() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      disabled: '=',
      user: '='
    },
    templateUrl: 'angular-app/directives/forms/user-form/user-form-directive.html',
    controller: 'UserForm',
    controllerAs: 'vm'
  };
}
