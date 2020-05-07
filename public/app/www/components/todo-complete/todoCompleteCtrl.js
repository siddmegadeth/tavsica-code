app.controller('todoCompleteCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    // handle todo create
    warn("Executing todoCompleteCtrl");
    $timeout(function() {
        warn("retrieve List Todo todoInProgress List");
        $scope.isProgressLoading = true;
        if (stateManager.isTodoCompleteListAvailabe()) {
            $scope.todoCreatedList = stateManager.getTodoCompleteList();
            log($scope.todoCreatedList);
            $scope.isProgressLoading = false;

        } else {
            $scope.todoCreatedList = [];
            $scope.isProgressLoading = false;

        }

        // Called Every Time List Is Updated 
        $scope.$on("todo-complete", function(index, value) {
            error("Todo Progress Trigger Event");
            if (value.isTodoCompleteUpdated) {
                warn("Gettings Progress TODO From Storage");
                log(stateManager.getTodoCompleteList());
                $scope.todoCreatedList = stateManager.getTodoCompleteList();
            } else {

            }
        });
    });

}])