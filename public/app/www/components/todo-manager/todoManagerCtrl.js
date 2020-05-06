app.controller('todoManagerCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {


    $scope.openTodo = function() {
        $scope.myNavigator.pushPage('create-todo.html', { animation: window.onsenAnimation.lift });
    }

    $scope.global = {};

    $scope.globalTodoList = {};
    $scope.globalTodoList.create = [];
    $scope.globalTodoList.inprogress = [];
    $scope.globalTodoList.complete = [];

    $scope.createTodo = function(todo) {
        warn("Todo Created");
        log(todo);
        $scope.globalTodoList.create.push(todo);
        $scope.myNavigator.popPage()
            .then(function() {
                warn("Pagged Pop");
                $timeout(function() {

                    $scope.global = $scope.globalTodoList.create;
                });

            })
    };

}])