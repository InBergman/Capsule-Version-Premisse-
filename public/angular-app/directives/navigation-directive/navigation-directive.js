angular.module('capsule')
  .directive('navigationDirective', navigationDirective);

function navigationDirective() {
  return {
    restrict: 'E',
    templateUrl: 'angular-app/directives/navigation-directive/navigation-directive.html'
  };
}
