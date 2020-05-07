(function(window, undefined) {

    var isAuto = false;
    var devType = undefined;

    function winDevice(appName, inject) {
        try {
            if (window.angular) {
                isAuto = true;
                if (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1 || window.cordova) {
                    devType = true;
                    document.addEventListener("deviceready", function() {

                        angular.bootstrap(document, [appName]);
                        //  $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAiC98SnMtJTpFFTj5MrkTGmbfIE1n2neY');

                    }, false);
                } else {
                    devType = false;
                    document.addEventListener("DOMContentLoaded", function() {
                        angular.bootstrap(document, [appName]);

                        // $.getScript('https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAiC98SnMtJTpFFTj5MrkTGmbfIE1n2neY');

                        log("Device Ready");
                    });
                }


                var infoType = {};
                this.enable = function(flag) {
                    infoType.log = flag;
                    if (flag) {
                        log = console.log.bind(console);
                        error = console.error.bind(console);
                        warn = console.warn.bind(console);
                    }
                    if (!flag) {
                        log = function() {};
                        error = function() {};
                        warn = function() {};
                        console.log = function() {};
                        console.error = function() {};
                        console.warn = function() {};
                    }
                    return this;
                }
                this.device = function() {
                    if (window.angular) {
                        return angular.module(appName, inject);
                        return this;
                    } else {
                        console.error("Angularjs Not Found");
                    }
                };
                this.info = function() {
                    if (devType) {} else {}
                    return this;
                }

            } else {
                console.error("Angular Not Found");
            }
        } catch (e) {
            //Error
            return e;
        }
    }
    window.winDevice = winDevice;
})(window)