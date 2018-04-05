angular.module('capsule')
  .controller('PlaceForm', PlaceForm);

function PlaceForm(placeDataFactory, $location, $timeout, $scope) {
  var vm = this;
  // vm.imageSrc = "images/avatar.png";
  vm.user = {};
  vm.place = {};
  vm.disabled = undefined;
  vm.facilities = {
    wifi: false,
    handicap: false,
    electricity: false
  };
  vm.licenses = {
    spec: false,
    drink: false
  };

  vm.init = function() {
    $scope.$watch('user', function(newValue) {
      vm.user = newValue;
      // if (vm.user)
      //   vm.placeAvatar = vm.user.userAvatar;
    });

    $scope.$watch('user.place', function(newValue) {
      vm.place = newValue;
      if (vm.place && vm.place.facilities) {
        for (var i = 0; i < vm.place.facilities.length; i++) {
          vm.facilities[vm.place.facilities[i]] = true;
        }
      }
      if (vm.place && vm.place.licenses) {
        for (var i = 0; i < vm.place.licenses.length; i++) {
          vm.licenses[vm.place.licenses[i]] = true;
        }
      }
    });

    $scope.$watch('disabled', function(newValue) {
      vm.disabled = newValue;
    });
  };

  vm.checkField = function() {
    if (vm.place.placeName == undefined || vm.place.placeName == '')
      return false;
    if (vm.place.adress.l1 == undefined || vm.place.l1 == '')
      return false;
    if (vm.place.adress.l2 == undefined || vm.place.l2 == '')
      return false;
    if (vm.place.adress.cp == undefined || vm.place.adress.cp == '')
      return false;
    if (vm.place.adress.city == undefined || vm.place.adress.ciy == '')
      return false;
    if (vm.place.typeOfContact == undefined || vm.place.typeOfContact.length == 0)
      return false;
    if (vm.place.typeOfPlace == undefined || vm.place.typeOfPlace.length == 0)
      return false;
    if (vm.place.height == undefined || vm.place.height == '')
      return false;
    if (vm.place.size == undefined || vm.place.size == '')
      return false;
    if (vm.place.capacity == undefined || vm.place.capcity == '')
      return false;
    if (vm.user._id == undefined)
      return false;
    // if ($scope.type == 'POST' && !vm.myFile) {
    //   return false;
    // } else if ($scope.type == 'PUT' && vm.place.placeImages == undefined) {
    //   return false;
    // }
    return true;
  }

  vm.addPlace = function() {
    if (!vm.checkField()) {
      vm.error = 'Tous les champs sont obligatoires.';
      return;
    }
    var file = vm.myFile;
    var obj = {
      placeName: vm.place.placeName,
      typeOfPlace: vm.place.typeOfPlace,
      typeOfContact: vm.place.typeOfContact,
      height: vm.place.height,
      size: vm.place.size,
      capacity: vm.place.capacity,
      userRef: vm.user._id,
      facilities: [],
      licenses: [],
      l1: vm.place.adress.l1,
      l2: vm.place.adress.l2,
      cp: vm.place.adress.cp,
      city: vm.place.adress.city,
      misc: vm.place.misc,
      placeImages: vm.place.placeImages
    }
    for (var key in vm.facilities) {
      if (vm.facilities[key] == true)
        obj.facilities.push(key);
    }
    for (var key in vm.licenses) {
      console.log(vm.licenses[key]);
      if (vm.licenses[key] == true)
        obj.licenses.push(key);
    }
    var fd = new FormData();
    fd.append('avatar', file);
    for (var key in obj) {
      fd.append(key, obj[key]);
    }
    if ($scope.type == 'PUT')
      placeDataFactory.changePlace(vm, fd, $location, $timeout, $scope);
    else {
      placeDataFactory.addPlace(vm, fd, $location, $timeout, $scope);
    }
  };
}
