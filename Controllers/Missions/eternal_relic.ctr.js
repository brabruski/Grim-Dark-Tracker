grimApp.controller('RelicController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();
        battleDetails.$loaded(function () {
            battleDetails[index].objExist = true;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].battle.oqtymax;
            battleDetails[index].battle.objCount = battleDetails[index].battle.oqtymax;
            battleDetails.$save(index);
        });
        
        var index = 0;

        $scope.relicNo = function () {
            var score = 0;
            finalObjectiveQty(score);
        };

        $scope.relicYes = function () {
            var score = 3;
            finalObjectiveQty(score);
        };

        var finalObjectiveQty = function (score) {
            battleDetails = DBServices.savedGame();
            battleDetails.$loaded(function () {
                if (!battleDetails[index].victCount) {
                    if (battleDetails[index].completed) {
                        battleDetails[index].objScoreCount = score;
                        battleDetails[index].vicpoints = $scope.main.vicpoints + score;
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
        }; // end function


        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };

    }]);