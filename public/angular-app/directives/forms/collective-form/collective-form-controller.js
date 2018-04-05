angular.module('capsule')
  .controller('CollectiveForm', CollectiveForm);

function CollectiveForm(collectiveDataFactory, $location, $timeout, $scope) {
  var vm = this;
  vm.user = {};
  vm.collective = {};
  vm.disabled = undefined;

  vm.init = function() {
    $scope.$watch('user', function(newValue) {
      vm.user = newValue;
      // if (vm.user)
      //   vm.collectiveAvatar = vm.user.userAvatar;
    });

    $scope.$watch('user.collective', function(newValue) {
      vm.collective = newValue;
    });

    $scope.$watch('disabled', function(newValue) {
      vm.disabled = newValue;
    });
  };

  vm.checkField = function() {
    if (vm.collective.collectiveName == undefined || vm.collective.collectiveName == '')
      return false;
    if (vm.collective.adress.l1 == undefined || vm.collective.l1 == '')
      return false;
    if (vm.collective.adress.l2 == undefined || vm.collective.l2 == '')
      return false;
    if (vm.collective.adress.cp == undefined || vm.collective.adress.cp == '')
      return false;
    if (vm.collective.adress.city == undefined || vm.collective.adress.ciy == '')
      return false;
    if (vm.collective.typeOfContact == undefined || vm.collective.typeOfContact == '')
      return false;
    if (vm.collective.size == undefined || vm.collective.size == '')
      return false;
    if (vm.collective.siret == undefined || vm.collective.siret == '')
      return false;
    if (vm.collective.univers == undefined || vm.collective.univers == '')
      return false;
    if (vm.user._id == undefined)
      return false;
    // if ($scope.type == 'POST' && !vm.myFile) {
    //   return false;
    // } else if ($scope.type == 'PUT' && vm.collective.collectiveAvatar == undefined) {
    //   return false;
    // }
    return true;
  }

  vm.addCollective = function() {
    if (!vm.checkField()) {
      vm.error = 'Tous les champs sont obligatoires.';
      return;
    }
    var file = vm.myFile;
    var obj = {
      collectiveName: vm.collective.collectiveName,
      typeOfContact: vm.collective.typeOfContact,
      size: vm.collective.size,
      univers: vm.collective.univers,
      userRef: vm.user._id,
      l1: vm.collective.adress.l1,
      l2: vm.collective.adress.l2,
      cp: vm.collective.adress.cp,
      city: vm.collective.adress.city,
      siret: vm.collective.siret,
      collectiveAvatar: vm.collective.collectiveAvatar
    }
    var fd = new FormData();
    fd.append('avatar', file);
    for (var key in obj) {
      fd.append(key, obj[key]);
    }
    if ($scope.type == 'PUT')
      collectiveDataFactory.changeCollective(vm, fd, $location, $timeout, $scope);
    else {
      collectiveDataFactory.addCollective(vm, fd, $location, $timeout, $scope);
    }
  };
}
