﻿grimApp.controller('EmpWillController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();

        battleDetails.$loaded(function () {
            battleDetails[index].objExist = true;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].battle.oqtymax;
            battleDetails.$save(index);
            $scope.missionObjQty = 0;
            $scope.finalObjQty = 0;
        });

        var index = 0;

        $scope.finalObjectiveQty = function () {
            battleDetails = DBServices.savedGame();
            battleDetails.$loaded(function () {
                if (!battleDetails[index].victCount) {
                    if (battleDetails[index].completed) {
                        var totalObj = $scope.finalObjQty * 3;
                        battleDetails[index].objScoreCount = totalObj;
                        battleDetails[0].vicpoints = $scope.main.vicpoints + totalObj;
                        battleDetails[index].victCount = true;
                        battleDetails.$save(index);
                        addSuccessMsg = 'Victory Points Updated Successfully';
                        $scope.showSimpleToast(addSuccessMsg);
                        $scope.main.vicpoints = battleDetails[0].vicpoints;
                        $scope.main.victCount = battleDetails[index].victCount;
                        $scope.main.finalVicPoints = battleDetails[index].objScoreCount;
                    }
                } else {
                    addSuccessMsg = 'Final Objectives Have Already Been Counted!';
                    $scope.showSimpleToast(addSuccessMsg);
                }
            });
            return $scope.main.victCount;
        }; // end function

        $scope.generateObjective = function () {
            var indNum = Math.floor(Math.random() * 3 + 1) + 2;
            $scope.missionObjQty = indNum;
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };

    }]);