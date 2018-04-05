angular.module('capsule')
  .directive('capsuleSelect', function() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/directives/capsule-directive/capsule-select-directive.html',
	  controller: 'CapsuleSelectController',
    controllerAs: 'vm'
  };
});