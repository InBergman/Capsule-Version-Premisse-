angular.module('capsule')
  .controller('UsersController', ['$filter', UsersController]);

function UsersController(userDataFactory, $filter) {
  var vm = this;
  vm.title = "Users";
  vm.imagePath = '/uploads/users/';
  vm.lookpath = '#!/users/';
  userDataFactory.userList().then(function(response) {
    vm.users = response;
  });

  vm.formatDate = function (date) {
    return $filter('date')(date, "yyyy-MM-dd");;
  }

}
