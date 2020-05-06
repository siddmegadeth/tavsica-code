"use strict";
var DI = [
    'onsen',
    'ghiscoding.validation',
    'pascalprecht.translate',
];
var win = new winDevice("myApp", DI); //Bootstrap Cordova Or Browser Based App .no ng-app Required
var app = win.device(); // init App
win.enable(true);
win.info();

// onsenui config
ons.ready(function() {
    warn("ONSEN Is Ready");
    // ons.enableDeviceBackButtonHandler();
    ons.disableDeviceBackButtonHandler();
    ons.setDefaultDeviceBackButtonListener(function(event) {
        ons.notification.confirm('Do you want to close the App?') // Ask for confirmation
            .then(function(index) {
                if (index === 1) { // OK button
                    navigator.app.exitApp(); // Close the app
                }
            });
    });
    //FastClick.attach(document.body)

    if (ons.platform.isIPhoneX()) { // Utility function
        // Add empty attribute to the <html> element
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    }

});

window.initAnimation = function(type) {
    if (type == 'android') {
        window.onsenAnimation = {};
        window.onsenAnimation.slide = 'slide-md';
        window.onsenAnimation.lift = 'lift-md';
    }
    if (type == 'ios') {
        window.onsenAnimation = {};
        window.onsenAnimation.slide = 'slide-ios';
        window.onsenAnimation.lift = 'lift-ios';
    }
    warn("Initiated ONSENUI Styling Object");
    log(window.onsenAnimation);
}

// both platform values has to be same 
initAnimation('android');
ons.platform.select('android');

app.config(['$httpProvider', '$translateProvider', function($httpProvider, $translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix: 'plugins/angular-validation/locales/validation/',
        suffix: '.json'
    });

    $translateProvider.preferredLanguage('en');

}]);


app.run(['$rootScope', function($rootScope) {
    warn("Run Block Is Initaited");

    $rootScope.$on('$routeChangeSuccess', function() {
        warn("View Changed Successfully");
    });


    $rootScope.$on('$routeChangeError', function(event, current, previous, rejection) {

    });

}]);