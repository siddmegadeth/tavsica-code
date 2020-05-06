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
        }
    }

}]);