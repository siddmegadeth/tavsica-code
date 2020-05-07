app.controller('todoCreateCtrl', ['$scope', '$rootScope', '$timeout', 'stateManager', function($scope, $rootScope, $timeout, stateManager) {

    // handle todo create
    warn("Executing todoCreateCtrl");
    $scope.createTodo = function(todo) {
        warn("Todo Created");
        todo.created_at =  moment();
        todo.type = 'create';
        log(todo);
        stateManager.saveTodoList(todo);

        $rootScope.$broadcast("todo:updated", { isTodoUpdated: true });
        $scope.myNavigator.popPage();

    };





}])