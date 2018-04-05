angular.module('capsule')
  .directive('artistForm', artistForm);

function artistForm() {
  return {
    restrict: 'EA',
    scope: {
      type: '@',
      disabled: '=',
      user: '='
    },
    templateUrl: 'angular-app/directives/forms/artist-form/artist-form-directive.html',
    controller: 'ArtistForm',
    controllerAs: 'vm'
  };
}
