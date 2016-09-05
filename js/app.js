var grimApp = angular.module('grimApp', ['ngRoute', 'ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial', 'ngMdIcons', 'firebase']);

var config = {
    apiKey: "AIzaSyDFD330aSVMODDPvqfBJ2ec1ydNk2jU4U4",
    authDomain: "grimdarktracker30082016.firebaseapp.com",
    databaseURL: "https://grimdarktracker30082016.firebaseio.com",
    storageBucket: "grimdarktracker30082016.appspot.com"
};

firebase.initializeApp(config);

//If something doesn't resolve in the route (grimApp.config.when) then run this.
grimApp.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
        // We can catch the error thrown when the $requireSignIn promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $location.path("/home");
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
            controller: 'NewGameController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
        when('/savegame', {
            templateUrl: 'Views/savegame.html',
            controller: 'SavedGameController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
        when('/addnew', {
            templateUrl: 'Views/addnewcard.html',
            controller: 'AddCardController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
        when('/addnewd', {
            templateUrl: 'Views/addnewdeck.html',
            controller: 'AddDeckController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
        when('/adddefd', {
            templateUrl: 'Views/adddefaultdeck.html',
            controller: 'AddDefaultDeckController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
        when('/addnewbat', {
            templateUrl: 'Views/addnewbattletype.html',
            controller: 'AddBattleController',
            resolve: {
                "currentAuth": ['Auth', function (Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        }).
   otherwise({
       redirectTo: '/home'
   });
}]);

grimApp.factory("Auth", ["$firebaseAuth",
  function ($firebaseAuth) {
      return $firebaseAuth();
  }
]);

