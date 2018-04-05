angular.module('capsule')
  .factory('userDataFactory', userDataFactory);

function userDataFactory($http, httpMethodsFactory, $route) {

  var path = 'api/users/';

  return {
    userList: userList,
    addUser: addUser,
    userDisplay: userDisplay,
    userRemove: userRemove,
    changeUser: changeUser,
    adminAll: adminAll
  };

  function adminAll() {
    return $http.get('/api/admins').then(complete).catch(failed);
  }

  function userList() {
    return $http.get('/api/users').then(complete).catch(failed);
  }

  function addUser(vm, fd, $location, $timeout) {
    httpMethodsFactory.postForm(fd, path).then(function(response) {
      vm.message = 'Utilisateur ' + response.data.userForename + ' créé(e).';
      $timeout(function() {
        $location.search('show', 'details');
        $location.path("/users/" + response.data._id);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      vm.error = err.data.message
    });
  }

  function changeUser(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.putForm(fd, path + vm.user._id).then(function(response) {
      vm.message = 'Utilisateur ' + response.data.userForename + ' modifié(e).';
      $timeout(function() {
        $location.search('show', 'details');
        $location.path("/users/" + response.data._id);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      console.log(err);
      vm.error = err.data.message
      $timeout(function() {
        vm.error = undefined;
      }, 2000);
    });
  }

  function userRemove(id, $location) {
    httpMethodsFactory.deleteItem('api/users/', id).then(function(response) {
      $timeout(function() {
        $location.path("/users/");
      }, 2000);
    }).catch(function(err) {
      $location.path("/users/");
    });
  }

  function userDisplay(id) {
    return $http.get('api/users/' + id).then(complete).catch(failed);
  }

  function complete(response) {
    return response.data;
  }

  function failed(err) {
    console.log(err.statusText);
  }

}
