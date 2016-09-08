grimApp.controller('PurgeAlienController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        var index = 0;
        battleDetails = DBServices.savedGame();

        battleDetails.$loaded(function () {
            battleDetails[index].objExist = true;
            battleDetails.$save(index);
            $scope.main.objExist = battleDetails[index].objExist;
        });

        $scope.unitDestroyed = function () {
            $scope.main.vicpoints++;
            battleDetails[index].vicpoints = $scope.main.vicpoints;
            battleDetails.$save(index);
            addSuccessMsg = 'Unit Destroyed. Victory Points Updated!';
            $scope.showSimpleToast(addSuccessMsg);
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };
        
    }]);