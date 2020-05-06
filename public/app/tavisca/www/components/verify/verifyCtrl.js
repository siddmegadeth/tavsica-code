app.controller('verifyCtrl', ['$scope', 'stateManager', '$timeout', function($scope, stateManager, $timeout) {

    $scope.pageRefresh = function($done) {
        $scope.verifyLoader = true;
        $timeout(function() {
            $scope.verifyLoader = false;
            makeLocationAccuracyRequest();

            $done();
        }.bind(this), 1000);
    }.bind(this);


    $timeout(function() {
        $scope.myNavigator.resetToPage('landing.html', { aniamtion: window.onsenAnimation.slide });
    })


}])