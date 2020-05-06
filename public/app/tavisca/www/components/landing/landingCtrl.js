app.controller('landingCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {


    // Callback function Success

    $scope.pageRefresh = function($done) {
        $scope.isLandingLoading = true;
        $timeout(function() {
            $scope.isLandingLoading = false;
            // $scope.initiateDirectGeolocation();

            $done();
        }.bind(this), 1000);
    }.bind(this);


    $scope.showPopOver = function() {
        ons.createElement('popover.html', { parentScope: $scope })
            .then(function(popover) {
                popover.show();
            });
    }

}])