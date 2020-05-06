app.service('httpTimeoutInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {


        request: function(config) {
            config.timeout = 25000;

            return config;
        },
        response: function(config) {
            return config;
        }

    }

}]);

app.service('httpInterceptors', ['$timeout', '$rootScope', function($timeout, $rootScope) {

    return {
        request: function(config) {

            if (window.localStorage.access_token) {
                var token = window.localStorage.access_token;
                if (token != undefined || token != null) {

                    // get token from a cookie or local storage
                    config.headers = config.headers || {};
                    config.headers.Authorization = "Bearer " + token;
                }
            }
            return config;
        },
        response: function(config) {

            return config;

        },
        requestError: function(config) {

            ons.notification.toast({
                message: "No Internet Connection",
                timeout: 4000,
                buttonLabel: 'Ok'
            });

            return config;

        },
        responseError: function(config) {

            ons.notification.toast({
                message: "Server Communication Error Occured. Try Again Later",
                timeout: 4000,
                buttonLabel: 'Ok'
            });

            return config;

        }


    }

}]);