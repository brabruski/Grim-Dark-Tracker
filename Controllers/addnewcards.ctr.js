grimApp.controller('AddCardController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', '$timeout',
    function ($scope, $rootScope, $firebaseAuth, $firebaseArray, Config, DBServices, MaterialFunc, NewContentFactory, $timeout) {

        var deckDetails = DBServices.tactDeck();

        deckDetails.$loaded().then(function (data) {
            $scope.decks = deckDetails;
            $scope.deckSelected = $scope.decks[0];
            $scope.maxpoints = NewContentFactory.maxNumber(6);
            $scope.minpoints = NewContentFactory.maxNumber(3);
        });

        //Inititalise Values to make adding cards easier
        $scope.fly = false;
        $scope.fort = false;
        $scope.mystobj = false;
        $scope.veh = false;
        $scope.psykene = false;
        $scope.psykmy = false;
        $scope.multipoint = false;
        $scope.minpointSelected = 1;
        $scope.maxpointSelected = 1;
        $scope.cardNumber = NewContentFactory.cardNumbers();

        //function to add to firebase
        $scope.addCard = function (deckToAddTo) {
            var currentDeck = deckToAddTo.$id;
            var allCardDetails = DBServices.tactObjectives(currentDeck);

            allCardDetails.$loaded().then(function () {
                
                var setId = NewContentFactory.createId(allCardDetails);

                var cardDetails = {
                    id: setId,
                    cardname: $scope.cardname,
                    carddescription: $scope.carddescription,
                    cnumber: $scope.cnumber,
                    ctype: $scope.ctype,
                    multipoint: $scope.multipoint,
                    minpoint: $scope.minpointSelected,
                    maxpoint: $scope.maxpointSelected,
                    fly: $scope.fly,
                    fort: $scope.fort,
                    mystobj: $scope.mystobj,
                    veh: $scope.veh,
                    psykene: $scope.psykene,
                    psykmy: $scope.psykmy,
                    date: firebase.database.ServerValue.TIMESTAMP
                };

                allCardDetails.$add(cardDetails)
                    .then(function () {
                        //after submitting, clears the fields
                        $scope.cardname = '';
                        $scope.carddescription = '';
                        $scope.cnumber = '';
                        $scope.ctype = '';
                        $scope.fly = false;
                        $scope.fort = false;
                        $scope.mystobj = false;
                        $scope.veh = false;
                        $scope.psykene = false;
                        $scope.psykmy = false;
                        $scope.multipoint = false;
                        $scope.minpointSelected = 1;
                        $scope.maxpointSelected = 1;
                        var addSuccessMsg = "Card Added Successfully!";
                        $scope.showSimpleToast(addSuccessMsg);
                    });
            }); //end loaded function
        }; //end add function

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