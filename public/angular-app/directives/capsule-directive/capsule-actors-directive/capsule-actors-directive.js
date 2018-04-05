angular.module('capsule').directive('capsuleActors', capsuleActors);


  function capsuleActors() {
  return {
    restrict: 'E',
    scope: 	{
    			users: '=',
    			who: '='
    		},
    require: 'ngModel',
    templateUrl: 'angular-app/directives/capsule-directive/capsule-actors-directive/capsule-actors-directive.html',
    controllerAs: 'vm',
	controller: 'CapsuleActorsController'
	}
}