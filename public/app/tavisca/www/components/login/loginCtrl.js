app.controller('loginCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    $timeout(function() {
        $scope.isLoginLoading = false;
    });

    //  Login Function Validate Number And Request Signin
    $scope.login = function(username) {

        if (username.length != 0) {

        } else {
            // loader
            $scope.isLoginLoading = false;
            warn("Not A Valid Number");
            ons.notification.toast({
                message: 'Username is required',
                timeout: 2000,
                buttonLabel: 'Dismiss'
            });
        }

    }



}])