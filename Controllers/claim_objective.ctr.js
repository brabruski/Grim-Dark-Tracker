function ObjectiveClaimController($scope, $mdDialog, card) {
    $scope.card = card;

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (amount) {
        $mdDialog.hide(amount);
    };

}