angular.module('capsule')
  .factory('httpMethodsFactory', httpMethodsFactory);

function httpMethodsFactory($http) {

  return {
    deleteItem: deleteItem,
    postForm: postForm,
    putForm: putForm
  };

  function putForm(fd, uploadUrl) {
    return $http.put(uploadUrl, fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    })
  }

  function postForm(fd, url) {
    return $http.post(url, fd, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined
      }
    })
  }

  function deleteItem(url, id) {
    return $http.delete(url + id)
  }
}
