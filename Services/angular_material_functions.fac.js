grimApp.factory('MaterialFunc',
	['$mdToast', '$mdDialog', '$mdMedia',
function ($mdToast, $mdDialog, $mdMedia) {
    var matObj = {
        //Toast Position on Screen
        toastDetails: function () {
            var last = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };
            var toastPosition = angular.extend({}, last);

            return toastPosition;
        },
        getToastPos: function () {
            var details = matObj.toastDetails();
            return Object.keys(details)
                      .filter(function (pos) { return details[pos]; })
                      .join(' ');
        },
        showToast: function (message) {
            var pinTo = matObj.getToastPos();
            $mdToast.show(
                      $mdToast.simple()
                        .textContent(message)
                        .position(pinTo)
                        .hideDelay(3000)
                    );
        },

        //Pop Up Dialogue for Round Advancement
        confirmEndRound: function (ev) {
            var confirm = $mdDialog.confirm()
          .title('Would you like to end this round?')
          .textContent('You can not go back after advancing the round.')
          .ariaLabel('Continue')
          .targetEvent(ev)
          .ok('Continue')
          .cancel('Cancel');
            var dialogue = $mdDialog.show(confirm);
            return dialogue;
        },

        //Check if game ends after round 4
        checkEndGame: function (ev) {
            var confirm = $mdDialog.confirm()
          .title('Check to see if the Game Ends!')
          .textContent('Roll a D6. At Round 5, on a 3+ the Game Ends. At Round 6, the Game Ends on a 4+. The Game will end automatically at round 7. If the Game ends you will no longer be able to gain Victory Points.')
          .ariaLabel('Does the Game End')
          .targetEvent(ev)
          .ok('Game Continues')
          .cancel('Game Ends');
            var dialogue = $mdDialog.show(confirm);
            return dialogue;
        },

        confirmDiscard: function (ev) {
            var confirm = $mdDialog.confirm()
          .title('Would You Like To Discard This Card?')
          .textContent('Once discarded, this Tactical Objective will be unavailable for the rest of the game.')
          .ariaLabel('Confirm card Discard')
          .targetEvent(ev)
          .ok('Discard')
          .cancel('Cancel');
            var dialogue = $mdDialog.show(confirm);
            return dialogue;
        },

        confirmClaim: function (ev, item) {
            var confirm = $mdDialog.show({
                controller: ObjectiveClaimController,
                templateUrl: 'Views/Missions/claim_obj.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                preserveScope: true,
                clickOutsideToClose: true,
                // fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                locals: {
                    card: item
                }
            });

            function ObjectiveClaimController($scope, $mdDialog, card) {
                $scope.card = card;

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.claim = function (amount) {
                    $mdDialog.hide(amount);
                };

            }

            return confirm;
        }
    };
    return matObj;
}]); //end factory
