var grimApp = angular.module('grimApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial', 'ngMdIcons', 'firebase']);

//If something doesn't resolve in the route (logApp.config.when) then run this.
grimApp.run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $rootScope.message = 'You need to log in to access that page';
            $location.path('/login');
        }
    });
}]);

grimApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'Views/login.html',
        controller: 'RegistrationController'
    }).
    when('/register', {
        templateUrl: 'Views/register.html',
        controller: 'RegistrationController'
    }).
    when('/home', {
        templateUrl: 'Views/home.html',
        controller: 'HomeController'
    }).
   otherwise({
       redirectTo: '/home'
   });
}]);

