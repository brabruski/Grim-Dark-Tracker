var grimApp = angular.module('grimApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial', 'ngMdIcons', 'firebase']);

//If something doesn't resolve in the route (grimApp.config.when) then run this.
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
        when('/newgame', {
            templateUrl: 'Views/newgame.html',
            controller: 'NewGameController'
        }).
        when('/savegame', {
            templateUrl: 'Views/savegame.html',
            controller: 'SavedGameController'
        }).
        when('/addnew', {
            templateUrl: 'Views/addnewcard.html',
            controller: 'AddCardController'
        }).
        when('/addnewd', {
            templateUrl: 'Views/addnewdeck.html',
            controller: 'AddDeckController'
        }).
   otherwise({
       redirectTo: '/home'
   });
}]);

