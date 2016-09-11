grimApp.controller('CleanseControlController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', 'BattleFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, BattleFactory, $timeout) {
        battleDetails = DBServices.savedGame();
        var index = 0;
        var gameDraw = 3;


        //Initialise Mission Details
        battleDetails.$loaded(function () {
            battleDetails[index].inPlay = {};
            battleDetails[index].objExist = true;
            $scope.activeDeck = battleDetails[index].activeDeck;
            $scope.warlordAlive = battleDetails[index].warlordAlive;
            $scope.main.discards = battleDetails[index].battle.tdiscard;
            if (battleDetails[index].deck) {
                $scope.deckLeft = battleDetails[index].deck.length;                
            } else {                
                $scope.deckLeft = 0;
            }
            battleDetails[index] = BattleFactory.checkGameDiscards(battleDetails[index], gameDraw);
            $scope.main.draws = battleDetails[index].battle.tdraw;
            $scope.main.objExist = battleDetails[index].objExist;
            $scope.main.objCount = battleDetails[index].battle.oqtymax;
            battleDetails.$save(index);
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
                battleDetails[index] = BattleFactory.pickCard(battleDetails[index], gameDraw);
                if (battleDetails[index].battle.tdraw > 0) {
                    battleDetails[index] = BattleFactory.checkGameDiscards(battleDetails[index], gameDraw);
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
        }


        $scope.checkDraws = function () {
            if (battleDetails[index].deck) {
                return BattleFactory.checkItemZero(battleDetails[index].battle.tdraw);
            } else {
                return true;
            }
        }

        $scope.getCardColour = function () {
            return BattleFactory.getCardColour(battleDetails[index].army.cardcolour);
        }


    }]);