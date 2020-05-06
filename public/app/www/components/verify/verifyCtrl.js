app.controller('verifyCtrl', ['$scope', 'stateManager', '$timeout', function($scope, stateManager, $timeout) {

    $scope.pageRefresh = function($done) {
        $scope.verifyLoader = true;
        $timeout(function() {
            $scope.verifyLoader = false;
            makeLocationAccuracyRequest();
            $done();
        }.bind(this), 1000);
    }.bind(this);

    // if using server based token then use toekn based approach. this is a demo

    $timeout(function() {
        warn("Validate If User logged I OrNot By checking username");
        if (stateManager.isLoggedIn()) {
            $scope.myNavigator.resetToPage('landing.html', { aniamtion: window.onsenAnimation.lift });
        } else {
            $scope.myNavigator.resetToPage('login.html', { aniamtion: window.onsenAnimation.slide });

        }
    })

}])