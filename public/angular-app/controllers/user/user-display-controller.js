angular.module('capsule')
  .controller('UserController', UserController);

function UserController(userDataFactory, artistDataFactory, placeDataFactory, clientDataFactory, collectiveDataFactory, $routeParams, $location, $filter, $mdDialog, fileUploade, $timeout, $scope) {
  var vm = this;
  vm.disabled = true;
  vm.toShow = 'details';

  vm.show = function(string) {
    vm.toShow = string;
    if (string == 'artist')
      $location.search('show', 'artist');
    else if (string == 'details')
      $location.search('show', 'details');
    else if (string == 'place')
      $location.search('show', 'place');
    else if (string == 'client')
      $location.search('show', 'client')
    else if (string == 'collective')
      $location.search('show', 'collective')
  };

  vm.modify = function(string) {
    vm.disabled = false;
  }

  vm.activate = function(string) {
    if (string == 'artist') {
      vm.user.status.isArtist = true;
      vm.toShow = 'artist';
      if (!vm.user.artist)
        vm.disabled = false;
      else
        vm.disabled = true;
    } else if (string == 'place') {
      vm.user.status.isPlace = true;
      vm.toShow = 'place'
      if (!vm.user.place)
        vm.disabled = false;
      else
        vm.disabled = true;
    } else if (string == 'client') {
      vm.user.status.isClient = true;
      vm.toShow = 'client';
      if (!vm.user.client)
        vm.disabled = false;
      else
        vm.disabled = true;
    } else if (string == 'collective') {
      vm.user.status.isCollective = true;
      vm.toShow = 'collective';
      if (!vm.user.collective)
        vm.disabled = false;
      else
        vm.disabled = true;
    }
  }

  vm.activeTab = function(string) {
    return (string == vm.toShow ? 'active' : '');
  }

  vm.formatDate = function(date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }

  vm.showUser = function() {
    var id = $routeParams.id;
    if ($routeParams.show)
      vm.toShow = $routeParams.show;
    userDataFactory.userDisplay(id).then(function(response) {
      vm.user = response;
    })

  }

  vm.deleteItem = function(type) {
    if (type == 'artist' && vm.user.artist)
      artistDataFactory.artistRemove(vm.user.artist._id, $location, $timeout);
    else if (type == 'place' && vm.user.place)
      placeDataFactory.placeRemove(vm.user.place._id, $location, $timeout);
    else if (type == 'client' && vm.user.client)
      clientDataFactory.clientRemove(vm.user.client._id, $location, $timeout);
    else if (type == 'collective' && vm.user.collective)
      collectiveDataFactory.collectiveRemove(vm.user.collective._id, $location, $timeout);
  }

  vm.deleteUser = function(ev) {
    var confirm = $mdDialog.confirm()
      .title('Voulez-vous vraiment supprimer cet utilisateur ?')
      .textContent('Cela supprimera toutes les données associées.')
      .ariaLabel('Lucky day')
      .targetEvent(ev)
      .ok('Oui')
      .cancel('Non.');

    $mdDialog.show(confirm).then(function() {
      var id = $routeParams.id;
      userDataFactory.userRemove(id, $location);
    }, function() {
      console.log('cancel');
    });
  };

}
