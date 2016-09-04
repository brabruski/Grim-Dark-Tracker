grimApp.controller('AddDeckController', ['$scope', '$rootScope', '$location', '$firebaseAuth', '$firebaseArray', 'Config', 'DBServices', 'MaterialFunc', '$timeout', 'currentAuth',
    function ($scope, $rootScope, $location, $firebaseAuth, $firebaseArray, Config, DBServices, MaterialFunc, $timeout, currentAuth) {

        var deckDetails = DBServices.tactDeck();

        $scope.cardcolour = "red";

        $scope.addDeck = function () {
            //check existing ids
            var deckIds = [];
            for (var i = 0; i < deckDetails.length; i++) {
                deckIds.push(deckDetails[i].id);
            }
            var highId = 0;
            for (var j = 0; j < deckIds.length; j++) {
                if (deckIds[j] > highId) {
                    highId = deckIds[j];
                }
            }
            highId++;

            //$add firebase method for adding to database
            deckDetails.$add({
                id: highId,
                deckname: $scope.deckname,
                cardcolour: $scope.cardcolour,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function () {
                $location.path('/home');
            }
            );
        };

}]);