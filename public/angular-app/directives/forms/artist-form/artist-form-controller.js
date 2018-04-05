angular.module('capsule')
  .controller('ArtistForm', ArtistForm);

function ArtistForm(artistDataFactory, $location, $timeout, $scope) {
  var vm = this;
  vm.user = {};
  vm.artist = {};
  vm.disabled = undefined;

  vm.init = function() {
    $scope.$watch('user', function(newValue) {
      vm.user = newValue;
      // if (vm.user)
      //   vm.artistAvatar = vm.user.userAvatar;
    });

    $scope.$watch('user.artist', function(newValue) {
      vm.artist = newValue;
    });

    $scope.$watch('filepreview', function(newValue) {
      vm.filepreview = newValue;
    });

    $scope.$watch('disabled', function(newValue) {
      vm.disabled = newValue;
    });
  };

  vm.checkField = function() {
    if (vm.artist.artistName == undefined || vm.artist.artistName == '')
      return false;
    if (vm.artist.adress.l1 == undefined || vm.artist.l1 == '')
      return false;
    if (vm.artist.adress.l2 == undefined || vm.artist.l2 == '')
      return false;
    if (vm.artist.adress.cp == undefined || vm.artist.adress.cp == '')
      return false;
    if (vm.artist.adress.city == undefined || vm.artist.adress.ciy == '')
      return false;
    if (vm.artist.numMda == undefined || vm.artist.numMda == '')
      return false;
    if (vm.artist.siret == undefined || vm.artist.siret == '')
      return false;
    if (vm.user._id == undefined)
      return false;
    if ($scope.type == 'POST' && !vm.myFile) {
      return false;
    } else if ($scope.type == 'PUT' && vm.artist.artistAvatar == undefined) {
      return false;
    }
    return true;
  }

  vm.addArtist = function() {
    if (!vm.checkField()) {
      vm.error = 'Tous les champs sont obligatoires.';
      return;
    }
    var file = vm.myFile;
    var obj = {
      artistForename: vm.user.userForename,
      artistSurname: vm.user.userSurname,
      artistName: vm.artist.artistName,
      artistAvatar: vm.artist.artistAvatar,
      numMda: vm.artist.numMda,
      siret: vm.artist.siret,
      userRef: vm.user._id,
      l1: vm.artist.adress.l1,
      l2: vm.artist.adress.l2,
      cp: vm.artist.adress.cp,
      city: vm.artist.adress.city,
      statut: vm.artist.statut,
      univers: vm.artist.univers
    }
    var fd = new FormData();
    fd.append('avatar', file);
    for (var key in obj) {
      fd.append(key, obj[key]);
    }
    if ($scope.type == 'PUT')
      artistDataFactory.changeArtist(vm, fd, $location, $timeout, $scope);
    else {
      artistDataFactory.addArtist(vm, fd, $location, $timeout, $scope);
    }
  };
}
