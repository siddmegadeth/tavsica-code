app.service('stateManager', ['$window', function($window) {

    return {
        saveUserName: function(username) {
            $window.localStorage.setItem('username', username);
        },
        getUserName: function() {
            if ($window.localStorage)
                $window.localStorage.username;
        },
        //  Only on username for now as it is a demo else check accessstoekn with expiry date
        isLoggedIn: function() {
            if ($window.localStorage.username)
                return true;
            else
                return false;
        },
        clear: function() {
            $window.localStorage.clear();
        },
        getUsername: function() {
            if ($window.localStorage.username)
                return $window.localStorage.username;
        },
        saveTodoList: function(todo) {
            if (!$window.localStorage.todo) {
                var templist = [];
                templist.push(todo);
                $window.localStorage.setItem("todo", JSON.stringify(templist));
            } else {
                var templist = JSON.parse($window.localStorage.todo);
                templist.push(todo);
                $window.localStorage.setItem("todo", JSON.stringify(templist));
            }
        },
        isTodoListAvailabe: function() {

            if ($window.localStorage.todo) {
                var todo = JSON.parse($window.localStorage.todo);
                log(todo);
                if (todo.length != 0) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        getTodoList: function(todo) {
            if ($window.localStorage.todo)
                return JSON.parse($window.localStorage.todo);
        },
        deleteTodoListTuple: function(index) {

        }
    }

}]);