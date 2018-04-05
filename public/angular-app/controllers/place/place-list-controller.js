angular.module('capsule')
  .controller('PlacesController', PlacesController);

function PlacesController(placeDataFactory, $filter) {
  var vm = this;
  vm.title = "Lieux";
  vm.imagePath = '/uploads/lieux/';
  vm.lookpath = '#!/users/';
  placeDataFactory.placeList().then(function(response) {
    vm.places = response;
  });

  vm.formatDate = function (date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }
}
