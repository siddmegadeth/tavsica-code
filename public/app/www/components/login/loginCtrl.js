app.controller('loginCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    $timeout(function() {
        $scope.isLoginLoading = false;
    });

    //  Login Function Validate Number And Request Signin
    $scope.login = function(username) {
        $scope.isLoginLoading = true;

        if (username) {
            $scope.isLoginLoading = false;
            stateManager.saveUserName(username);
            $scope.myNavigator.resetToPage('landing.html', { animation: window.onsenAnimation.lift });
        } else {
            // loader
            $scope.isLoginLoading = false;
            ons.notification.toast({
                message: 'Username is required',
                timeout: 2000,
                buttonLabel: 'Dismiss'
            });
        }

    }



}])