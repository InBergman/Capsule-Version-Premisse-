angular.module('capsule')
  .controller('ArtistsController', ArtistsController);

function ArtistsController(artistDataFactory, $filter) {
  var vm = this;
  vm.title = "Artistes";
  vm.imagePath = '/uploads/artistes/';
  vm.lookpath = '#!/users/';
  artistDataFactory.artistList().then(function(response) {
    vm.artists = response;
  });

  vm.formatDate = function (date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }
}
