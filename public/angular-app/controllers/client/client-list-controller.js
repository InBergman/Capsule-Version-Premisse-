angular.module('capsule')
  .controller('ClientsController', ClientsController);

function ClientsController(clientDataFactory, $filter) {
  var vm = this;
  vm.title = "Client";
  vm.imagePath = '/uploads/clients/';
  vm.lookpath = '#!/clients/';
  clientDataFactory.clientList().then(function(response) {
    vm.clients = response;
  });

  vm.formatDate = function (date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }
}
