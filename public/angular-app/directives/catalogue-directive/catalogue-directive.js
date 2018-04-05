angular.module('capsule')
  .directive('catalogue', function() {
    return {
      restrict: 'E',
      scope: {
        obj: '=',
        imagepath: '=',
        lookpath: '=',
        title: '=',
        email: '=',
        phone: '=',
        image: '=',
        date: '=',
        path: '@',
        id: '=',
        show: '@'
      },
      controller: 'CatalogueController',
      templateUrl: 'angular-app/directives/catalogue-directive/catalogue-directive.html'
    };
  });
