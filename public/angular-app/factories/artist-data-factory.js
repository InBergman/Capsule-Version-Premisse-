angular.module('capsule')
  .factory('artistDataFactory', artistDataFactory);

function artistDataFactory($http, httpMethodsFactory, $route) {

  var path = 'api/artistes/';

  return {
    artistList: artistList,
    addArtist: addArtist,
    changeArtist: changeArtist,
    artistDisplay: artistDisplay,
    artistRemove: artistRemove
  };

  function artistList() {
    return $http.get('/api/artistes').then(complete).catch(failed);
  }

  function artistDisplay(id) {
    return $http.get('api/artistes/' + id).then(complete).catch(failed);
  }

  function addArtist(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.postForm(fd, path).then(function(response) {
      vm.message = 'Artiste ' + response.data.artistName + ' créé(e).';
      $timeout(function() {
        $location.search('show', 'artist');
        $location.path("/users/" + response.data.userRef);
        $route.reload();
      }, 2000);
    }).catch(function(err) {
      vm.error = err.data.message
    });
  }

  function changeArtist(vm, fd, $location, $timeout, $scope) {
    httpMethodsFactory.putForm(fd, path + vm.artist._id).then(function(response) {
      vm.message = 'Artiste ' + response.data.artistName + ' modifié(e).';
      $timeout(function() {
        $location.search('show', 'artist');
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

  function artistRemove(id, $location, $timeout) {
    httpMethodsFactory.deleteItem('api/artistes/', id).then(function(response) {
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
