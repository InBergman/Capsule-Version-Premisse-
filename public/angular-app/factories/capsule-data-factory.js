angular
      .module('capsule')
      .factory('capsuleDataFactory', capsuleDataFactory);

function capsuleDataFactory($http) {

  return {
    capsuleAddCreneaux: capsuleAddCreneaux,
    capsulePost:        capsulePost,
    capsuleGetAll:      capsuleGetAll,
    capsuleGetOne:      capsuleGetOne,
    capsuleModif:       capsuleModif,
    capsuleUpdate:      capsuleUpdate
  };

  function capsuleGetAll() {
    return $http.get('/api/capsules').then(complete).catch(failed);
  }

  function capsuleGetOne(id) {
    return $http.get('/api/capsules/' + id).then(complete).catch(failed);
  }

  function capsuleAddCreneaux(creneaux) {
    return $http.post('/api/capsules/:caspuleId', creneaux).then(complete).catch(failed);
  }

  function capsulePost(obj) {
    return $http.post('/api/capsules', obj).then(complete).catch(failed);
  }

  function capsuleUpdate(allId) {
    return $http.put('/api/capsules', allId).then(complete).catch(failed);
  }

  function capsuleModif(allId) {
    return $http.put('/api/capsules', allId).then(complete).catch(failed);
  }


  function complete(response) {
    return response.data;
  }

  function failed(err) {
    return err;
  }

}
