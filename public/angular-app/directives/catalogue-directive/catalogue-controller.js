angular.module('capsule')
  .controller('CatalogueController', CatalogueController);

function CatalogueController(artistDataFactory, $routeParams) {
  var vm = this;
  vm.test = 1;
  vm.errorImage = 'http://lorempixel.com/400/400/abstract/';

}
