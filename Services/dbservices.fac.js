grimApp.factory('DBServices',
    ['$rootScope', '$firebaseAuth', '$firebaseArray', 'Config',
    function ($rootScope, $firebaseAuth, $firebaseArray, Config) {

        //create db access object & methods
        var dbObj = {
            gameType: function (game) {
                var gameRef = firebase.database().ref('gametypes/' + game);
                var gameInfo = $firebaseArray(gameRef);
                return gameInfo;
            },

            tactObjectives: function (deck) {
                var objRef = firebase.database().ref('tacticaldecks/' + deck + '/cards');
                var objInfo = $firebaseArray(objRef);
                return objInfo;
            },

            tactDeck: function () {
                var deckRef = firebase.database().ref('tacticaldecks/');
                var deckInfo = $firebaseArray(deckRef);
                return deckInfo;
            },

            defaultTactDeck: function () {
                var defDeckRef = firebase.database().ref('defaultdeck/');
                var defDeckInfo = $firebaseArray(defDeckRef);
                return defDeckInfo;
            },

            savedGame: function () {
                var savedRef = firebase.database().ref('users/' + $rootScope.currentUser.$id + '/currentgame');
                var savedInfo = $firebaseArray(savedRef);
                return savedInfo;
            },           

        };

        return dbObj;

    }]);