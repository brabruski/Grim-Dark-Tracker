grimApp.controller('BattleController', ['$scope', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
            
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
                    if (!battleDetails[index].completed) {
                        if ($scope.roundNum < 7) {
                            if ($scope.roundNum > 4) {
                                MaterialFunc.checkEndGame(ev).then(function () {
                                    $scope.roundNum++;
                                    battleDetails[index].round = $scope.roundNum;
                                    battleDetails[index] = BattleFactory.endRoundCleanUp(battleDetails[index]);                                                                        
                                    addSuccessMsg = 'Round Advanced';
                                    $scope.showSimpleToast(addSuccessMsg);
                                    battleDetails.$save(index);
                                    $scope.main.discards = battleDetails[index].battle.tdiscard;
                                    $scope.main.draws = battleDetails[index].battle.tdraw;
                                    $scope.main.completed = battleDetails[index].completed;
                                    $scope.main.objExist = battleDetails[index].objExist;
                                }, function () {
                                    battleDetails[index].completed = true;
                                    battleDetails.$save(index);
                                    addSuccessMsg = 'Game Has Ended';
                                    $scope.showSimpleToast(addSuccessMsg);
                                });
                            } else {
                                MaterialFunc.confirmEndRound(ev).then(function () {
                                    $scope.roundNum++;
                                    battleDetails[index].round = $scope.roundNum;
                                    battleDetails[index] = BattleFactory.endRoundCleanUp(battleDetails[index]);
                                    addSuccessMsg = 'Round Advanced';
                                    $scope.showSimpleToast(addSuccessMsg);
                                    battleDetails.$save(index);
                                    $scope.main.discards = battleDetails[index].battle.tdiscard;
                                    $scope.main.draws = battleDetails[index].battle.tdraw;
                                    $scope.main.completed = battleDetails[index].completed;
                                    $scope.main.objExist = battleDetails[index].objExist;
                                }, function () {
                                    addSuccessMsg = 'Cancelled';
                                    $scope.showSimpleToast(addSuccessMsg);
                                });
                            }                            
                        } else {
                            addSuccessMsg = 'Game is Over';
                            $scope.showSimpleToast(addSuccessMsg);
                        }
                    }

                    if (!battleDetails[index].completed && $scope.roundNum === 7) {
                        battleDetails[index].completed = true;
                        addSuccessMsg = 'Game is Over';
                        $scope.showSimpleToast(addSuccessMsg);
                    }                    

                }; //end endRound function

                $scope.checkEndRound = function () {
                    return BattleFactory.isEndRoundValid(battleDetails[index]);
                };

                $scope.toggleSecCond = function (num) {
                    battleDetails[index] = BattleFactory.secCondComplete(battleDetails[index], num);
                    battleDetails.$save(index);
                    $scope.main.vicpoints = battleDetails[index].vicpoints;                       
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

            }); //End battleDetails.$loaded
        }]);