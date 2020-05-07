app.controller('todoInProgressCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    // handle todo create


    $scope.updateToComplete = function() {
        warn("Tuple To Be In Progress");
        log(tuple)
        log(index);
        stateManager.saveToTodoProgress(tuple);
        $rootScope.$broadcast("todo-complete", { isTodoCompleteUpdated: true });

    };

    $scope.deleteTodoProgress = function(index) {
        warn("Tuple To Be Deleted In Progress");
        stateManager.deleteTodoProgressListTuple(index);
        log(index);
        $timeout(function() {
            $scope.todoCreatedList = stateManager.getTodoProgressList();
        });
    }


    warn("Executing todoInProgressCtrl");
    $timeout(function() {
        warn("retrieve List Todo todoInProgress List");
        $scope.isProgressLoading = true;
        if (stateManager.isTodoProgressListAvailabe()) {
            $scope.todoCreatedList = stateManager.getTodoProgressList();
            log($scope.todoCreatedList);
            $scope.isProgressLoading = false;

        } else {
            $scope.todoCreatedList = [];
            $scope.isProgressLoading = false;

        }

        // Called Every Time List Is Updated 
        $scope.$on("todo-progress", function(index, value) {
            error("Todo Progress Trigger Event");
            if (value.isTodoProgressUpdated) {
                warn("Gettings Progress TODO From Storage");
                log(stateManager.getTodoProgressList());
                $scope.todoCreatedList = stateManager.getTodoProgressList();
            } else {

            }
        });
    });


}])