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
            if ($window.localStorage.todo) {
                log("Deleting Todo Tuple From List");
                var pop = [];
                pop = JSON.parse($window.localStorage.todo);
                pop.pop(index);
                log(pop);
                $window.localStorage.setItem("todo", JSON.stringify(pop));
            }
        },
        //  Below Cover Progreess Screen  + Delete From Earlier List
        saveToTodoProgress: function(todo, index) {
            if (!$window.localStorage.todo_progress) {
                var templist = [];
                todo.type = 'progress';
                todo.created_at = moment();

                templist.push(todo);
                $window.localStorage.setItem("todo_progress", JSON.stringify(templist));

                // delete this from todo original list
                if ($window.localStorage.todo) {
                    log("Deleting Todo Tuple From List");
                    var pop = [];
                    pop = JSON.parse($window.localStorage.todo);
                    pop.pop(index);
                    log(pop);
                    $window.localStorage.setItem("todo", JSON.stringify(pop));
                }

            } else {
                var templist = JSON.parse($window.localStorage.todo_progress);
                templist.push(todo);
                $window.localStorage.setItem("todo_progress", JSON.stringify(templist));
                // delete this from todo original list
                if ($window.localStorage.todo) {
                    log("Deleting Todo Tuple From List");
                    var pop = [];
                    pop = JSON.parse($window.localStorage.todo);
                    pop.pop(index);
                    log(pop);
                    $window.localStorage.setItem("todo", JSON.stringify(pop));
                }
            }
        },
        isTodoProgressListAvailabe: function() {
            if ($window.localStorage.todo_progress) {
                var todo = JSON.parse($window.localStorage.todo_progress);
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
        getTodoProgressList: function() {
            if ($window.localStorage.todo_progress)
                return JSON.parse($window.localStorage.todo_progress);
        },
        deleteTodoProgressListTuple: function(index) {
            if ($window.localStorage.todo_progress) {
                log("Deleting Todo Tuple From List");
                var pop = [];
                pop = JSON.parse($window.localStorage.todo_progress);
                pop.pop(index);
                log(pop);
                $window.localStorage.setItem("todo_progress", JSON.stringify(pop));
            }
        },
        // Todo Complete List below
        isTodoCompleteListAvailabe: function() {
            if ($window.localStorage.todo_complete) {
                var todo = JSON.parse($window.localStorage.todo_complete);
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
        getTodoCompleteList: function() {
            if ($window.localStorage.todo_complete)
                return JSON.parse($window.localStorage.todo_complete);
        },
        saveTodoComplete: function(todo,index) {
            if (!$window.localStorage.todo_complete) {
                var templist = [];
                todo.type = 'complete';
                todo.created_at = moment();
                templist.push(todo);
                $window.localStorage.setItem("todo_complete", JSON.stringify(templist));
                // delete this from todo original list
                if ($window.localStorage.todo_progress) {
                    log("Deleting Todo Tuple From List");
                    var pop = [];
                    pop = JSON.parse($window.localStorage.todo_progress);
                    pop.pop(index);
                    log(pop);
                    $window.localStorage.setItem("todo_progress", JSON.stringify(pop));
                }

            } else {
                var templist = JSON.parse($window.localStorage.todo_complete);
                templist.push(todo);
                $window.localStorage.setItem("todo_complete", JSON.stringify(templist));
                // delete this from todo original list
                if ($window.localStorage.todo) {
                    log("Deleting Todo Tuple From List");
                    var pop = [];
                    pop = JSON.parse($window.localStorage.todo_progress);
                    pop.pop(index);
                    log(pop);
                    $window.localStorage.setItem("todo_progress", JSON.stringify(pop));
                }
            }
        }
    }

}]);