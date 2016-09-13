grimApp.controller('NewGameController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', '$timeout',
    function ($scope, $firebaseAuth, $firebaseArray, $location, Config, DBServices, MaterialFunc, NewContentFactory, $timeout) {

        var missionDetails = DBServices.gameType(); //mission types
        var armyOptions = DBServices.tactDeck(); //army decks
        var defaultDeck = DBServices.defaultTactDeck(); //default tactical cards

        //Send db items to $scope once loaded
        armyOptions.$loaded(function () {
            $scope.armyDeck = armyOptions;
            $scope.armySelected = $scope.armyDeck[0];
        });

        missionDetails.$loaded(function () {
            $scope.games = missionDetails;
            $scope.gameSelected = $scope.games[0];

            $scope.checktacticalMission = function () {
                if ($scope.gameSelected.type === 'Eternal War') {
                    return false;
                } else {
                    return true;
                }
            };
        });


        $scope.generateMission = function () {
            $scope.gameSelected = NewContentFactory.generateItem(missionDetails);
            return $scope.gameSelected;
        };

        //Set object for options
        $scope.options = NewContentFactory.tactOptions();
        

        //commander traits
        $scope.traits = NewContentFactory.traitOptions();
        $scope.traitList = NewContentFactory.traitList();
        $scope.traitSelected = $scope.traitList[0];
        

        $scope.addGame = function () {
            var deck = NewContentFactory.createBattleDeck($scope.armySelected, defaultDeck);
            var deckEdited = NewContentFactory.applyOptions(deck, $scope.options);
            var battleDetails = DBServices.savedGame(); //link new battle to user saved battles
            $scope.traits = NewContentFactory.traitModify($scope.traitSelected);
      

            battleDetails.$loaded(function () {
                battleDetails.$remove(0);
                var newBattleDetails = {
                    completed: false,
                    options: $scope.options,
                    traits: $scope.traits,
                    deck: deckEdited,
                    army: $scope.armySelected,
                    battle: $scope.gameSelected,
                    vicpoints: 0,
                    round: 0,
                    objExist: false,
                    objCount: 0,
                    lineBreak: false,
                    firstBlood: false,
                    warlordAlive: true,
                    started: false
                };

                battleDetails.$add(newBattleDetails).then(function () {
                    $location.path('/battle');
                }, function (error) {
                    console.log("Error:", error);
                });

            });


        };        

    }]);