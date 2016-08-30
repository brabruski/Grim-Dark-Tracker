//Create Password Matching Validation Directive
grimApp.directive('passwValidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs['passwValidation'], function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('passwValidation', errorMsg ? false : true);
            });
        }
    };
});