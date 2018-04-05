angular.module('capsule')
  .factory('placeDataFactory', placeDataFactory);

function placeDataFactory($http, httpMethodsFactory, $route) {

  var path = 'api/lieux/';

  return {
    placeList: placeList,
    placeDisplay: placeDisplay,
    placeRemove: placeRemove,
    addPlace: addPlace,
    changePlace: changePlace
  };

  function placeList() {
    return $http.get('/api/lieux/').then(complete).catch(failed);
  }

  function placeDisplay(id) {
    return $http.get('api/lieux/' + id).then(complete).catch(failed);
  }

  function addPlace(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.postForm(fd, path).then(function(response) {
      vm.message = 'lieux ' + response.data.placeName + ' créé(e).';
      $timeout(function() {
        $location.search('show', 'place');
        $location.path("/users/" + response.data.userRef);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      vm.error = err.data.message
    });
  }

  function changePlace(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.putForm(fd, path + vm.place._id).then(function(response) {
      vm.message = 'Lieux ' + response.data.placeName + ' modifié(e).';
      $timeout(function() {
        $location.search('show', 'place');
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

  function placeRemove(id, $location, $timeout) {
    httpMethodsFactory.deleteItem('api/lieux/', id).then(function(response) {
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
