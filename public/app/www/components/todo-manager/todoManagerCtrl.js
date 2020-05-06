app.controller('todoManagerCtrl', ['$scope', '$rootScope', '$timeout', function($scope, $rootScope, $timeout) {


    $scope.openTodo = function() {
        $scope.myNavigator.pushPage('create-todo.html', { animation: window.onsenAnimation.lift });
    }

}])