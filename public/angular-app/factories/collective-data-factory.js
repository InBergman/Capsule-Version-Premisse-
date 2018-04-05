angular.module('capsule')
  .factory('collectiveDataFactory', collectiveDataFactory);

function collectiveDataFactory($http, httpMethodsFactory, $route) {

  var path = 'api/collectifs/';

  return {
    collectiveList: collectiveList,
    collectiveDisplay: collectiveDisplay,
    collectiveRemove: collectiveRemove,
    addCollective: addCollective,
    changeCollective: changeCollective
  };

  function collectiveList() {
    return $http.get('/api/collectifs/').then(complete).catch(failed);
  }

  function collectiveDisplay(id) {
    return $http.get('api/collectifs/' + id).then(complete).catch(failed);
  }

  function addCollective(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.postForm(fd, path).then(function(response) {
      vm.message = 'Collectif ' + response.data.collectiveName + ' créé(e).';
      $timeout(function() {
        $location.search('show', 'collective');
        $location.path("/users/" + response.data.userRef);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      vm.error = err.data.message
    });
  }

  function changeCollective(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.putForm(fd, path + vm.collective._id).then(function(response) {
      vm.message = 'Collectif ' + response.data.collectiveName + ' modifié(e).';
      $timeout(function() {
        $location.search('show', 'collective');
        $location.path("/users/" + response.data.userRef);
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

  function collectiveRemove(id, $location, $timeout) {
    httpMethodsFactory.deleteItem('api/collectifs/', id).then(function(response) {
      $timeout(function() {
        $location.search('show', 'details');
        $location.path("/users/" + response.data.userRef);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      console.log(err);
      $location.path("/users/");
    });
  }

  function complete(response) {
    return response.data;
  }

  function failed(err) {
    console.log(err.statusText);
  }

}
