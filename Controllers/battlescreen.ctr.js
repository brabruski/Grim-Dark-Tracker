grimApp.controller('BattleController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, $timeout) {

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
            $scope.mystObject = battleDetails[index].battle.omystery;
            //$scope.main for child Controller to access

            $scope.main = {};
            $scope.main.vicpoints = battleDetails[index].vicpoints;
            $scope.main.completed = battleDetails[index].completed;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].objCount;
            $scope.main.lineBreak = battleDetails[index].lineBreak;
            $scope.main.firstBlood = battleDetails[index].firstBlood;
            $scope.main.slayWarLord = battleDetails[index].slayWarLord;            
        });

        $scope.checkObjExist = function () {
            if ($scope.main.objExist) {
                return false;
            } else {
                return true;
            }
        };

        $scope.startGame = function () {
            if (battleDetails[index].objExist) {
                $scope.roundNum++;
                battleDetails[index].round = $scope.roundNum;
                battleDetails.$save(index);
            } else {
                addSuccessMsg = 'You Still Need To Complete The Pre-Game Setup.';
                $scope.showSimpleToast(addSuccessMsg);
            }
        };

        $scope.endRound = function (ev) {
            if (battleDetails[index].completed === false) {
                if ($scope.roundNum < 6) {
                    if ($scope.roundNum > 3) {
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

            if (battleDetails[index].completed === false && $scope.roundNum === 6) {
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
                if (num === 0) {
                    if (battleDetails[index].slayWarLord) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }

                if (num === 1) {
                    if (battleDetails[index].firstBlood) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }

                if (num === 2) {
                    if (battleDetails[index].lineBreak) {
                        return 'md-warn';
                    } else {
                        return 'md-raised md-primary';
                    }
                }

            };

            //ngInclude each Mission Type where needed
            $scope.whichBattle = function () {
                switch (battleDetails[index].battle.name) {
                    case 'Crusade':
                        return 'Views/Missions/eternal_crusade.html';
                    default:
                        break;
                }
            };

            //toast functions
            $scope.toastPosition = MaterialFunc.toastDetails();

            $scope.getToastPosition = function () {
                return MaterialFunc.getToastPos(MaterialFunc.toastDetails());
            };

            $scope.showSimpleToast = function (message) {
                var pinTo = $scope.getToastPosition();
                return MaterialFunc.showToast(pinTo, message);
            };



        }]);