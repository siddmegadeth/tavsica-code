app.controller('todoListCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    // handle todo create
    warn("Executing todoListCtrl");



    $scope.openTodo = function() {
        log("Open Todo Create ");
        $scope.myNavigator.pushPage('create-todo.html', { animation: window.onsenAnimation.slide });
    }



    $scope.updateToProgress = function(tuple, index) {
        warn("Tuple To Be Moved In Progress");
        log(tuple)
        log(index);
        stateManager.saveToTodoProgress(tuple, index);
        $rootScope.$broadcast("todo-progress", { isTodoProgressUpdated: true });
        $timeout(function() {
            $scope.todoCreatedList = stateManager.getTodoList();
        });
    }

    $scope.deleteTodo = function(index) {
        warn("Tuple To Be Deleted");
        stateManager.deleteTodoListTuple(index);
        log(index);
        $timeout(function() {
            $scope.todoCreatedList = stateManager.getTodoList();
        });
    }

    $scope.calculateAgo = function(dateFromStorage) {
        var m = moment(dateFromStorage);
        return moment(m, 'ddd MMM DD YYYY HH:mm:ss GMT Z').diff(Date.now(), 'minutes');
    }


    $timeout(function() {
        warn("retrieve List Todo Created List");
        $scope.isTodoListLoading = true;
        if (stateManager.isTodoListAvailabe()) {
            $scope.todoCreatedList = stateManager.getTodoList();
            log($scope.todoCreatedList);
            $scope.isTodoListLoading = false;

        } else {
            $scope.todoCreatedList = [];
            $scope.isTodoListLoading = false;

        }

        // Called Every Time List Is Updated 
        $scope.$on("todo:updated", function(index, value) {
            warn("Todo Update Trigger");
            if (value.isTodoUpdated) {
                warn("Gettings Updated TODO From Storage");
                log(stateManager.getTodoList());
                $scope.todoCreatedList = stateManager.getTodoList();
            } else {

            }
        });
    });

}])