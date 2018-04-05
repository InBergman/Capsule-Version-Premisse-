angular.module('capsule')
  .controller('ClientForm', ClientForm);

function ClientForm(clientDataFactory, $location, $timeout, $scope) {
  var vm = this;
  vm.user = {};
  vm.client = {};
  vm.disabled = undefined;

  vm.init = function() {
    $scope.$watch('user', function(newValue) {
      vm.user = newValue;
    });

    $scope.$watch('user.client', function(newValue) {
      vm.client = newValue;
    });

    $scope.$watch('filepreview', function(newValue) {
      vm.filepreview = newValue;
    });

    $scope.$watch('disabled', function(newValue) {
      vm.disabled = newValue;
    });
  };

  vm.checkField = function() {
    if (vm.client.clientName == undefined || vm.client.clientName == '')
      return false;
    if (vm.client.adress.l1 == undefined || vm.client.l1 == '')
      return false;
    if (vm.client.adress.l2 == undefined || vm.client.l2 == '')
      return false;
    if (vm.client.adress.cp == undefined || vm.client.adress.cp == '')
      return false;
    if (vm.client.adress.city == undefined || vm.client.adress.ciy == '')
      return false;
    if (vm.client.siret == undefined || vm.client.siret == '')
      return false;
    if (vm.client.presta == undefined || vm.client.presta == '')
      return false;
    if (vm.user._id == undefined)
      return false;
    // if ($scope.type == 'POST' && !vm.myFile) {
    //   return false;
    // } else if ($scope.type == 'PUT' && vm.client.clientAvatar == undefined) {
    //   return false;
    // }
    return true;
  }


  vm.addClient = function() {
    if (!vm.checkField()) {
      vm.error = 'Tous les champs sont obligatoires.';
      return;
    }
    var file = vm.myFile;
    var obj = {
      clientName: vm.client.clientName,
      clientAvatar: vm.client.clientAvatar,
      presta: vm.client.presta,
      siret: vm.client.siret,
      userRef: vm.user._id,
      l1: vm.client.adress.l1,
      l2: vm.client.adress.l2,
      cp: vm.client.adress.cp,
      city: vm.client.adress.city
    }
    var fd = new FormData();
    fd.append('avatar', file);
    for (var key in obj) {
      fd.append(key, obj[key]);
    }
    if ($scope.type == 'PUT')
      clientDataFactory.changeClient(vm, fd, $location, $timeout, $scope);
    else {
      clientDataFactory.addClient(vm, fd, $location, $timeout, $scope);
    }
  };
}
