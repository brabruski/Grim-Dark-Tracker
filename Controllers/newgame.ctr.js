﻿grimApp.controller('NewGameController', ['$scope', '$firebaseAuth', '$firebaseArray', '$location', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', '$timeout',
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
        });


        $scope.generateMission = function () {
            $scope.gameSelected = NewContentFactory.generateItem(missionDetails);
            return $scope.gameSelected;
        };

        //Set object for options
        $scope.options = {};
        $scope.options.mysteriousobj = false;
        $scope.options.flyers = false;
        $scope.options.fortification = false;
        $scope.options.vehicles = false;
        $scope.options.psykersene = false;
        $scope.options.psykersfriend = false;

        $scope.addGame = function () {
            var deck = NewContentFactory.createBattleDeck($scope.armySelected, defaultDeck);
            var deckEdited = NewContentFactory.applyOptions(deck, $scope.options);
            var battleDetails = DBServices.savedGame(); //link new battle to user saved battles

            battleDetails.$loaded(function () {
                battleDetails.$remove(0);

                var newBattleDetails = {
                    completed: false,
                    options: $scope.options,
                    deck: deckEdited,
                    army: $scope.armySelected,
                    battle: $scope.gameSelected
                };

                battleDetails.$add(newBattleDetails).then(function () {
                    $location.path('/battle');
                }, function (error) {
                    console.log("Error:", error);
                });

            });


        };

    }]);