angular.module('capsule')
  .controller('CapsulesProfilController', CapsulesProfilController);

function CapsulesProfilController(userDataFactory, capsuleDataFactory, $routeParams, $location) {
  var vm = this;
  vm.artistWho = 'artist';
  vm.lieuWho = 'lieu';
  vm.dateWho= 'date';
  vm.disabled = true;
  vm.toShow = 'détails';
  vm.capsuleBis = { status:
                  { isArtist: false, isClient: false, isPlace: false,isDate: false, detail: true }};
  vm.allId = { artistId: [], action: '', capsuleId: '' };
  vm.show = function(string) {
    vm.toShow = string;
  };

  vm.modify = function(string) {
    vm.disabled = false;
  }

  vm.deleteUser = function() {
    var id = $routeParams.id;
    userDataFactory.userRemove(id).then(function(response) {
      $location.path("/capsules/");
    })
  }

    vm.showUsers = function() {
    userDataFactory.userList().then(function(response) {
      vm.users = response;
    })
  }

  vm.activate = function(string) {
    if (string == 'artiste') {
      vm.capsuleBis.status.isArtist = true;
      vm.disabled = (!vm.capsule.artist) ? false : true;
    } else if (string == 'lieux') {
      vm.capsuleBis.status.isPlace = true;
      vm.disabled = (!vm.capsule.place) ? false : true;
    } else if (string == 'client') {
      vm.capsuleBis.status.isClient = true;
      vm.disabled = (!vm.capsule.client) ? false : true;
    } else if (string == 'date') {
      vm.capsuleBis.status.isDate = true;
      vm.disabled = (!vm.capsule.date) ? false : true;
    }
  }

  vm.isActiveTab = function(string) {
    return (string === vm.toShow ? 'active' : '');
  }

  vm.showCapsule = function() {
    var id = $routeParams.id;
    capsuleDataFactory.capsuleGetOne($routeParams.id).then(function(response){
      vm.capsule = response;

    });
  }

  vm.showAllCapsule = function() {
    var id = $routeParams.id;
    capsuleDataFactory.capsuleGetAll($routeParams.id).then(function(response){
      vm.capsules = response;
    });
  }

  vm.initRequest = function() {
    vm.showAllCapsule();
    vm.showCapsule();
    vm.showUsers();
  }

  vm.delete = function(capsule) {
    vm.allId             = {};
    vm.allId.capsuleId   = vm.capsule._id;
    vm.allId.action      = 'deleteArtist';
    vm.allId.artistId    = capsule.artist[0]._id;
    capsuleDataFactory.capsuleUpdate(vm.allId).then(function(response){
       console.log(response);
    });
  }
}