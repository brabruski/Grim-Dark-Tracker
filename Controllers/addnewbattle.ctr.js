grimApp.controller('AddBattleController', ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray', 'Config', 'DBServices', 'MaterialFunc', 'NewContentFactory', '$timeout',
    function ($scope, $rootScope, $firebaseAuth, $firebaseArray, Config, DBServices, MaterialFunc, NewContentFactory, $timeout) {

        var battleDetails = DBServices.gameType();

        battleDetails.$loaded().then(function (data) {
            $scope.minopoints = NewContentFactory.maxNumber(6);
            $scope.maxopoints = NewContentFactory.maxNumber(6);
        });

        //Inititalise Values to make adding battles easier
        $scope.battleTypeSelected = 'Eternal War';
        $scope.objminSelected = 1;
        $scope.objmaxSelected = 1;
        $scope.tstart = 0;
        $scope.tmax = 0;
        $scope.tdiscard = 0;
        $scope.tdraw = 0;
        $scope.mystobjSelected = false;
        $scope.kpointSelected = false;
        $scope.kpname = 'None';
        $scope.objectiveValues = [{value: 0}];

        //function to add to firebase
        $scope.addBattle = function () {

            var setId = NewContentFactory.createId(battleDetails);
            var newArray = NewContentFactory.fillValue($scope.objmaxSelected, $scope.objectiveValues);

            var newBattle = {
                id: setId,
                name: $scope.battlename,
                type: $scope.battleTypeSelected,
                descrip: $scope.battledescription,
                wincond: $scope.battleconditions,
                oqtymin: $scope.objminSelected,
                oqtymax: $scope.objmaxSelected,
                ovalues: newArray,
                omystery: $scope.mystobjSelected,
                tstart: $scope.tstart,
                tmax: $scope.tmax,
                tdiscard: $scope.tdiscard,
                tdraw: $scope.tdraw,
                kp: $scope.kpointSelected,
                kpname: $scope.kpname,
                date: firebase.database.ServerValue.TIMESTAMP
            };

            battleDetails.$add(newBattle)
                    .then(function () {
                        //after submitting, clears the fields
                        $scope.battlename = '';
                        $scope.battledescription = '';
                        $scope.battleconditions = '';
                        $scope.objminSelected = 1;
                        $scope.objmaxSelected = 1;
                        $scope.mystobjSelected = 'false';
                        $scope.objectiveValues = [{value: 0}];
                        $scope.tstart = 0;
                        $scope.tmax = 0;
                        $scope.tdiscard = 0;
                        $scope.tdraw = 0;
                        $scope.kpointSelected = false;
                        $scope.kpname = 'None';
                        var addSuccessMsg = "Card Added Successfully!";
                        $scope.showSimpleToast(addSuccessMsg);
                    });
        }; //end add function

        $scope.addValue = function () {
            if ($scope.objectiveValues.length < $scope.objmaxSelected) {
                $scope.objectiveValues.push({ value: 0 });
            }
        };

        $scope.removeValue = function () {
            if ($scope.objectiveValues.length > 1) {
                $scope.objectiveValues.pop();
            }
        };

        //toast functions
        $scope.showSimpleToast = function (message) {
            return MaterialFunc.showToast(message);
        };



    }]);