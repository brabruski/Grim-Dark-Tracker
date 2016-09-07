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
        getToastPos: function (details) {
            return Object.keys(details)
                      .filter(function (pos) { return details[pos]; })
                      .join(' ');
        },
        showToast: function (pinTo, message) {
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
          .textContent('Roll a D6. At Round 4, on a 4+ the Game Ends. At Round 5, the Game Ends on a 5+. If you End the Game you will no longer be able to gain Victory Points.')
          .ariaLabel('Does the Game End')
          .targetEvent(ev)
          .ok('Game Continues')
          .cancel('Game Ends');
            var dialogue = $mdDialog.show(confirm);
            return dialogue;
        }
    };
    return matObj;
}]); //end factory
