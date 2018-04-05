angular.module('capsule')
  .service('fileUploade', ['$http', function($http) {
    var vm = this;

    // vm.postRequest = function($location, $timeout, vm, fd, conf) {
    //   vm.message = undefined;
    //   vm.error = undefined;
    //   $http.post(conf.uploadUrl, fd, {
    //       transformRequest: angular.identity,
    //       headers: {
    //         'Content-Type': undefined
    //       }
    //     })
    //     .then(function successCallback(response) {
    //       vm.message = conf.message;
    //       $timeout(function() {
    //         console.log("redirection fileuploade post");
    //         console.log(conf.pathToRedirect);
    //         $location.path(conf.pathToRedirect).search({
    //           show: conf.showQuery,
    //           disabled: conf.disabledQuery
    //         });
    //       }, 1000);
    //     }, function errorCallback(response) {
    //       vm.error = response.data.message;
    //     });
    // }

    // vm.putRequest = function($location, $timeout, vm, fd, conf, $scope) {
    //   vm.message = undefined;
    //   vm.error = undefined;
    //   $http.put(conf.uploadUrl, fd, {
    //       transformRequest: angular.identity,
    //       headers: {
    //         'Content-Type': undefined
    //       }
    //     })
    //     .then(function successCallback(response) {
    //       vm.message = conf.message;
    //       $timeout(function() {
    //         $scope.disabled = true;
    //         vm.message = undefined;
    //         vm.error = undefined;
    //       }, 1000);
    //     }, function errorCallback(response) {
    //       vm.error = response.data.message;
    //     });
    // }

    vm.postRequest = function(vm, fd, uploadUrl) {
      console.log("coucou");
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).then(vm.complete).catch(vm.failed);
    }

    vm.putRequest = function(vm, fd, uploadUrl) {
      $http.put(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        }
      }).then(vm.complete).catch(vm.failed);
    }

    vm.deleteItem = function(path, id, vm, $location, $timeout) {
      $http.delete(path + id)
        .then(function successCallback(response) {
          vm.message = 'Artist supprimé(e).';
          $timeout(function() {
            $location.path("/users/" + vm.user._id);
          }, 1000);
        }, function errorCallback(response) {
          vm.error = response.data.message;
        });
    }

    vm.complete = function(response) {
      return response.data;
    }

    vm.failed = function(err) {
      console.log(err.statusText);
      return err;
    }
  }]);
