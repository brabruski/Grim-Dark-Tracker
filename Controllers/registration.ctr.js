grimApp.controller('RegistrationController', ['$scope', 'Authentication', '$timeout', '$mdSidenav', '$log',
    function ($scope, Authentication, $timeout, $mdSidenav, $log) {

        $scope.login = function () {
            Authentication.login($scope.user);
        };
        $scope.logout = function () {
            Authentication.logout()
            .then(function () {
                $scope.close();
            });
        };
        $scope.register = function () {
            Authentication.register($scope.user);
        };

        $scope.toggleRight = buildToggler('left');

        //Create Sidenav functions
        function buildToggler(navID) {
            return function () {
                // Component lookup should always be available since we are not using `ng-if`
                $mdSidenav(navID)
                  .toggle();
            }
        }

        $scope.close = function () {
            $mdSidenav('left').close();
        };

    }]);
