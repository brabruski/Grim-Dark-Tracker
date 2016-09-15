grimApp.controller('DeadlockController', ['$scope', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();
        var index = 0;


        //Initialise Mission Details
        battleDetails.$loaded(function () {
            battleDetails[index].inPlay = {};
            battleDetails[index].objExist = true;
            $scope.activeDeck = battleDetails[index].activeDeck;
            $scope.warlordAlive = battleDetails[index].warlordAlive;
            if (battleDetails[index].deck) {
                $scope.deckLeft = battleDetails[index].deck.length;
            } else {
                $scope.deckLeft = 0;
            }
            battleDetails[index] = BattleFactory.checkGameDraws(battleDetails[index]);
            battleDetails[index].battle.tdiscard = BattleFactory.checkDiscardsWl(battleDetails[index], battleDetails[index].battle.tdiscard);
            battleDetails.$save(index);
            $scope.main.discards = battleDetails[index].battle.tdiscard;
            $scope.main.draws = battleDetails[index].battle.tdraw;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].battle.oqtymax;

        });

        //Makes relative bonus changes if Warlord dies
        $scope.warlordDeath = function () {
            battleDetails[index] = BattleFactory.checkWarlordAlive(battleDetails[index]);
            battleDetails[index].battle.tdiscard = BattleFactory.checkDiscardsWl(battleDetails[index], battleDetails[index].battle.tdiscard);
            $scope.main.discards = battleDetails[index].battle.tdiscard;
            battleDetails.$save(index);
        };

        //Changes class based on state
        $scope.checkToggle = function (num) {
            var secClass = BattleFactory.secObjClass(battleDetails[index], num);
            return secClass;
        };


        $scope.drawCard = function () {
            if (battleDetails[index].deck) {
                battleDetails[index] = BattleFactory.pickCard(battleDetails[index]);
                if (battleDetails[index].battle.tdraw > 0) {
                    battleDetails[index] = BattleFactory.checkGameDraws(battleDetails[index]);
                    battleDetails.$save(index);
                    $scope.main.draws = battleDetails[index].battle.tdraw;
                    $scope.deckLeft = battleDetails[index].deck.length;
                    $scope.activeDeck = battleDetails[index].activeDeck;
                }
            } else {
                $scope.main.draws = 0;
                $scope.deckLeft = 0;
            }
            $scope.activeDeck = battleDetails[index].activeDeck;
        };


        $scope.checkDraws = function () {
            if (battleDetails[index].deck) {
                return BattleFactory.checkItemZero(battleDetails[index].battle.tdraw);
            } else {
                return true;
            }
        };

        $scope.getCardColour = function () {
            return BattleFactory.getCardColour(battleDetails[index].army.cardcolour);
        };

        $scope.discardItem = function (ev, cardId) {
            MaterialFunc.confirmDiscard(ev).then(function () {
                battleDetails[index] = BattleFactory.discardCard(cardId, battleDetails[index]);
                battleDetails[index].battle.tdiscard = BattleFactory.discardAmount(battleDetails[index]);
                battleDetails.$save(index);
                $scope.activeDeck = battleDetails[index].activeDeck;
                $scope.main.discards = battleDetails[index].battle.tdiscard;
                addSuccessMsg = 'Card Discarded';
                $scope.showSimpleToast(addSuccessMsg);
            }, function () {
                addSuccessMsg = 'Discard Cancelled';
                $scope.showSimpleToast(addSuccessMsg);
            });


        };

        $scope.checkZero = function () {
            return BattleFactory.checkItemZero($scope.main.discards);
        };

        $scope.claimObj = function (ev, item) {
            //pass through info to dialog controller
            MaterialFunc.confirmClaim(ev, item).then(function (amount) {
                battleDetails[index] = BattleFactory.discardCard(item.id, battleDetails[index]);
                battleDetails[index].vicpoints = battleDetails[index].vicpoints + amount;
                battleDetails.$save(index);
                $scope.activeDeck = battleDetails[index].activeDeck;
                $scope.main.vicpoints = battleDetails[index].vicpoints;
                addSuccessMsg = 'Tactical Objective Successfully Claimed';
                $scope.showSimpleToast(addSuccessMsg);
            }, function () {
                addSuccessMsg = 'Tactical Objective Claim Cancelled';
                $scope.showSimpleToast(addSuccessMsg);
            });
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };


    }]);