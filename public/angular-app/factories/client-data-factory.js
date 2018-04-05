angular.module('capsule')
  .factory('clientDataFactory', clientDataFactory);

function clientDataFactory($http, httpMethodsFactory, $route) {

  var path = 'api/clients/';

  return {
    clientList: clientList,
    clientDisplay: clientDisplay,
    clientRemove: clientRemove,
    addClient: addClient,
    changeClient: changeClient
  };

  function clientList() {
    return $http.get('/api/clients/').then(complete).catch(failed);
  }

  function clientDisplay(id) {
    return $http.get('api/clients/' + id).then(complete).catch(failed);
  }

  function addClient(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.postForm(fd, path).then(function(response) {
      vm.message = 'Client ' + response.data.clientName + ' créé(e).';
      $timeout(function() {
        $location.search('show', 'client');
        $location.path("/users/" + response.data.userRef);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      vm.error = err.data.message
    });
  }

  function changeClient(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.putForm(fd, path + vm.client._id).then(function(response) {
      vm.message = 'Client ' + response.data.clientName + ' modifié(e).';
      $timeout(function() {
        $location.search('show', 'client');
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


  function clientRemove(id, $location, $timeout) {
    httpMethodsFactory.deleteItem('api/clients/', id).then(function(response) {
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
