grimApp.controller('BattleController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();
        var index = 0;

        battleDetails.$loaded(function () {
            $scope.roundNum = battleDetails[index].round;
            $scope.wincond = battleDetails[index].battle.wincond;
            $scope.missionName = battleDetails[index].battle.type + ' - ' + battleDetails[index].battle.name;
            $scope.armyName = battleDetails[index].army.deckname;
            $scope.startMsg = battleDetails[index].battle.descrip;
            $scope.objMin = battleDetails[index].battle.oqtymin;
            $scope.objMax = battleDetails[index].battle.oqtymax;
            //$scope.main for child Controller to access
            $scope.main = BattleFactory.battleOptions(battleDetails[index]);
        });

        $scope.checkObjExist = function () {
            return BattleFactory.checkIfExists($scope.main.objExist);
        };

        $scope.startGame = function () {
            if (battleDetails[index].objExist) {
                $scope.roundNum++;
                battleDetails[index].round = $scope.roundNum;
                battleDetails[index].started = true;
                battleDetails.$save(index);
                $scope.main.gameStarted = battleDetails[index].started;
            } else {
                addSuccessMsg = 'You Still Need To Complete The Pre-Game Setup.';
                $scope.showSimpleToast(addSuccessMsg);
            }
        };

        $scope.endRound = function (ev) {
            if (battleDetails[index].completed === false) {
                if ($scope.roundNum < 7) {
                    if ($scope.roundNum > 4) {
                        MaterialFunc.checkEndGame(ev).then(function () {
                            $scope.roundNum++;
                            battleDetails[index].round = $scope.roundNum;
                            battleDetails.$save(index);
                            addSuccessMsg = 'Round Advanced';
                            $scope.showSimpleToast(addSuccessMsg);
                        }, function () {
                            battleDetails[index].completed = true;
                            battleDetails.$save(index);
                            $scope.main.completed = battleDetails[index].completed;
                            addSuccessMsg = 'Game Has Ended';
                            $scope.showSimpleToast(addSuccessMsg);
                        });
                    } else {
                        MaterialFunc.confirmEndRound(ev).then(function () {
                            $scope.roundNum++;
                            battleDetails[index].round = $scope.roundNum;
                            battleDetails.$save(index);
                            addSuccessMsg = 'Round Advanced';
                            $scope.showSimpleToast(addSuccessMsg);
                        }, function () {
                            addSuccessMsg = 'Cancelled';
                            $scope.showSimpleToast(addSuccessMsg);
                        });
                    }
                } else {
                    $scope.main.completed = battleDetails[index].completed;
                    addSuccessMsg = 'Game is Over';
                    $scope.showSimpleToast(addSuccessMsg);
                }
            }

            if (battleDetails[index].completed === false && $scope.roundNum === 7) {
                battleDetails[index].completed = true;
                battleDetails.$save(index);
                $scope.main.completed = battleDetails[index].completed;
                addSuccessMsg = 'Game is Over';
                $scope.showSimpleToast(addSuccessMsg);
            }
        }; //end endRound function

        $scope.toggleSecCond = function (num) {
            if (num === 0) {
                if (battleDetails[index].slayWarLord) {
                    battleDetails[index].slayWarLord = !battleDetails[index].slayWarLord;
                    $scope.main.vicpoints--;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                } else {
                    battleDetails[index].slayWarLord = true;
                    $scope.main.vicpoints++;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                }
            }
            if (num === 1) {
                if (battleDetails[index].firstBlood) {
                    battleDetails[index].firstBlood = !battleDetails[index].firstBlood;
                    $scope.main.vicpoints--;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                } else {
                    battleDetails[index].firstBlood = true;
                    $scope.main.vicpoints++;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                }
            }
            if (num === 2) {
                if (battleDetails[index].lineBreak) {
                    battleDetails[index].lineBreak = !battleDetails[index].lineBreak;
                    $scope.main.vicpoints--;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                } else {
                    battleDetails[index].lineBreak = true;
                    $scope.main.vicpoints++;
                    battleDetails[index].vicpoints = $scope.main.vicpoints;
                    battleDetails.$save(index);
                }
            }
        };

        $scope.checkToggle = function (num) {
            var secClass = BattleFactory.secObjClass(battleDetails[index], num);
            return secClass;
        };

        //ngInclude each Mission Type where needed
        $scope.whichBattle = function () {
            var selectBattle = BattleFactory.battleSelect(battleDetails[index].battle.name);
            return selectBattle;
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };



    }]);