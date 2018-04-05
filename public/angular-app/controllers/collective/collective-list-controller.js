angular.module('capsule')
  .controller('CollectivesController', CollectivesController);

function CollectivesController(collectiveDataFactory, $filter) {
  var vm = this;
  vm.title = "Lieux";
  vm.imagePath = '/uploads/lieux/';
  vm.lookpath = '#!/users/';
  collectiveDataFactory.collectiveList().then(function(response) {
    vm.collectives = response;
  });

  vm.formatDate = function (date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }
}
