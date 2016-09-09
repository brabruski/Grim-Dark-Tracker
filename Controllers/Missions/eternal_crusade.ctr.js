grimApp.controller('CrusadeController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();

        battleDetails.$loaded(function () {
            $scope.main.objCount = battleDetails[index].objCount;
            $scope.main.victCount = battleDetails[index].victCount;
            $scope.missionObjQty = battleDetails[index].objCount;
        });

        $scope.finalObjQty = 0;
        var index = 0;

        $scope.addObjectiveQty = function () {
            if ($scope.missionObjQty >= $scope.objMin && $scope.missionObjQty <= $scope.objMax) {
                battleDetails[index].objExist = true;
                battleDetails[index].objCount = $scope.missionObjQty;
                battleDetails.$save(index);
                addSuccessMsg = 'Objectives Added';
                $scope.showSimpleToast(addSuccessMsg);
                $scope.main.objExist = true;
                $scope.main.objCount = battleDetails[index].objCount;
            } else {
                addSuccessMsg = 'Please Enter a Valid Quantity!';
                $scope.showSimpleToast(addSuccessMsg);
            }
        };

        $scope.finalObjectiveQty = function () {
            battleDetails = DBServices.savedGame();
            battleDetails.$loaded(function () {
                if (!battleDetails[index].victCount) {
                    if (battleDetails[index].completed) {
                        var totalObj = $scope.finalObjQty * 3;
                        battleDetails[0].vicpoints = $scope.main.vicpoints + totalObj;
                        battleDetails[index].victCount = true;
                        battleDetails.$save(index);
                        addSuccessMsg = 'Victory Points Updated Successfully';
                        $scope.showSimpleToast(addSuccessMsg);
                        $scope.main.vicpoints = battleDetails[0].vicpoints;
                        $scope.main.victCount = battleDetails[index].victCount;
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