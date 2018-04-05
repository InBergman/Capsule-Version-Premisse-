angular.module('capsule')
  .controller('UserForm', UserForm)

function UserForm(userDataFactory, $location, $timeout, $scope) {
  var vm = this;
  // vm.imageSrc = "images/avatar.png";
  vm.user = {};
  vm.disabled = undefined;

  vm.init = function() {
    $scope.$watch('user', function(newValue) {
      vm.user = newValue;
    });
    $scope.$watch('myFile', function(newfile, oldfile) {
      if (angular.equals(newfile, oldfile))
        return;
      vm.myFile = newfile;
    });
    $scope.$watch('disabled', function(newValue) {
      vm.disabled = newValue;
    });
  }

  vm.checkField = function() {
    if (vm.user.userForename == undefined || vm.user.userForename == '')
      return false;
    if (vm.user.userSurname == undefined || vm.user.userSurname == '')
      return false;
    if (vm.user.userEmail == undefined || vm.user.userEmail == '')
      return false;
    if (vm.user.userPhone == undefined || vm.user.userPhone == '')
      return false;
    if ($scope.type == 'POST' && !vm.myFile)
      return false
    else if ($scope.type == 'PUT' && vm.user.userAvatar == undefined)
      return false;
    return true;
  }

  vm.addUser = function() {
    if (!vm.checkField()) {
      vm.error = 'Tous les champs sont obligatoires.';
      return;
    }
    var file = vm.myFile;
    var obj = {
      userEmail: vm.user.userEmail,
      userPhone: vm.user.userPhone,
      userForename: vm.user.userForename,
      userSurname: vm.user.userSurname,
      userAvatar: vm.user.userAvatar
    }
    var fd = new FormData();
    fd.append('avatar', file);
    for (var key in obj) {
      fd.append(key, obj[key]);
    }
    if ($scope.type == 'PUT') {
      userDataFactory.changeUser(vm, fd, $location, $timeout, $scope);
    } else {
      userDataFactory.addUser(vm, fd, $location, $timeout);
    }
  };
}
