grimApp.controller('ScouringController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        var index = 0;
        battleDetails = DBServices.savedGame();

        battleDetails.$loaded(function () {
            battleDetails[index].objExist = true;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].battle.oqtymax;
            $scope.main.objValues = battleDetails[index].battle.ovalues;
            $scope.main.objSelected = [];
            $scope.main.unitName = battleDetails[index].battle.kpname;
            $scope.main.list = [];
            battleDetails.$save(index);         
        });

        $scope.unitDestroyed = function () {
            $scope.main.vicpoints++;
            battleDetails[index].vicpoints = $scope.main.vicpoints;
            battleDetails.$save(index);
            addSuccessMsg = 'Fast Attack Unit Destroyed. Victory Points Updated!';
            $scope.showSimpleToast(addSuccessMsg);
        };

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
            $scope.main.list = list;
        };        

        $scope.checked = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.submitObj = function () {
            var objScore = 0;
            for (i = 0; i < $scope.main.list.length; i++) {
                objScore = objScore + $scope.main.list[i].value;
            }
            battleDetails[index].objScoreCount = objScore;
            battleDetails[index].vicpoints = battleDetails[index].vicpoints + objScore;
            battleDetails[index].victCount = true;
            battleDetails.$save(index);
            $scope.main.vicpoints = battleDetails[index].vicpoints;
            $scope.main.victCount = battleDetails[index].victCount;
            $scope.main.finalVicPoints = battleDetails[index].objScoreCount;
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };

    }]);