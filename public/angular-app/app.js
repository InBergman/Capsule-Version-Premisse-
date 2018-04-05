angular.module('capsule', ['ngRoute', 'angular-jwt', 'ngMaterial'])
  .config(config)
// .run(run);

function config($httpProvider, $routeProvider) {
  // $httpProvider.interceptors.push('AuthInterceptor');

  $routeProvider
    .when('/', {
      resolve: {
        mess: function($location, AuthFactory) {
          $location.path('/users')
        }
      }
    })
    .when('/artistes/', {
      templateUrl: 'angular-app/controllers/artist/artists.html',
      controller: ArtistsController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/lieux/', {
      templateUrl: 'angular-app/controllers/place/places.html',
      controller: PlacesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/collectifs/', {
      templateUrl: 'angular-app/controllers/collective/collectives.html',
      controller: CollectivesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/clients/', {
      templateUrl: 'angular-app/controllers/client/clients.html',
      controller: ClientsController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/users/', {
      templateUrl: 'angular-app/controllers/user/users.html',
      controller: UsersController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/users/new', {
      templateUrl: 'angular-app/controllers/user/user-new.html',
      controller: UserController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/users/:id', {
      templateUrl: 'angular-app/controllers/user/user.html',
      controller: UserController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/capsules', {
      templateUrl: 'angular-app/controllers/capsule/capsules.html',
      controller: CapsulesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/capsules/new', {
      templateUrl: 'angular-app/controllers/capsule/capsules-new.html',
      controller: CapsulesController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/capsules/:id', {
      templateUrl: 'angular-app/controllers/capsule/capsule-profile.html',
      controller: CapsulesProfilController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .otherwise({
      redirectTo: '/'
    });
}

// function run($rootScope, $location, $window, AuthFactory) {
//   // console.log($location);
//   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//     if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
//       event.preventDefault();
//       $location.path('/');
//     }
//   });
// }
