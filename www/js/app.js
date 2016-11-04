// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.backButton.previousTitleText(false);//.text('');
  $ionicConfigProvider.views.swipeBackEnabled(false);


  $stateProvider

  .state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller: 'mCtrl'
  })
  .state('second', {
    url: '/second',
    templateUrl: 'templates/second.html',
    controller: 'mainCtrl'
  })




  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');
})

.controller('mCtrl', function($http, $scope,$state){
  $scope.goNav = function(argument) {
    $state.go("second");
  }
})


.controller('mainCtrl', function($http, $scope,$cordovaBackgroundGeolocation){

  //var bgGeo = window.BackgroundGeolocation;
  
  setTimeout(function(argument) {
    console.log($cordovaBackgroundGeolocation);
    //console.log(bgGeo);
  },800)
  
  //This callback will be executed every time a geolocation is recorded in the background.
  var callbackFn = function(location, taskId) {
      var coords = location.coords;
      var lat    = coords.latitude;
      var lng    = coords.longitude;
      console.log('- Location: ', JSON.stringify(location));
      // Must signal completion of your callbackFn.
      $cordovaBackgroundGeolocation.finish(taskId);
  };

  // This callback will be executed if a location-error occurs.  Eg: this will be called if user disables location-services.
  var failureFn = function(errorCode) {
      console.log('- BackgroundGeoLocation error: ', errorCode);
  }

  // Listen to location events & errors.
  

  // Fired whenever state changes from moving->stationary or vice-versa.
  // $cordovaBackgroundGeolocation.on('motionchange', function(isMoving) {
  //   console.log('- onMotionChange: isMoving = =  ', isMoving);
  // });

  // BackgroundGeoLocation is highly configurable.
  // $cordovaBackgroundGeolocation.configure({
  //     // Geolocation config
  //     desiredAccuracy: 0,
  //     distanceFilter: 10,
  //     stationaryRadius: 50,
  //     locationUpdateInterval: 1000,
  //     fastestLocationUpdateInterval: 5000,

  //     // Activity Recognition config
  //     activityType: 'AutomotiveNavigation',
  //     activityRecognitionInterval: 5000,
  //     stopTimeout: 5,

  //     // Application config
  //     debug: true,
  //     stopOnTerminate: false,
  //     startOnBoot: true,

  //     // HTTP / SQLite config
  //     url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
  //     method: 'POST',
  //     autoSync: true,
  //     maxDaysToPersist: 1,
  //     headers: {
  //         "X-FOO": "bar"
  //     },
  //     params: {
  //         // "auth_token": "maybe_your_server_authenticates_via_token_YES?"
  //     }
  // }, function(state) {
  //     // This callback is executed when the plugin is ready to use.
  //     console.log('BackgroundGeolocation ready: ', state);
  //     if (!state.enabled) {
  //         //$cordovaBackgroundGeolocation.start();
  //     }
  // });
  var options = {
      // Geolocation config
      desiredAccuracy: 0,
      distanceFilter: 10,
      stationaryRadius: 50,
      locationUpdateInterval: 1000,
      fastestLocationUpdateInterval: 5000,

      // Activity Recognition config
      activityType: 'AutomotiveNavigation',
      activityRecognitionInterval: 5000,
      stopTimeout: 5,

      // Application config
      debug: true,
      stopOnTerminate: false,
      startOnBoot: true,

      // HTTP / SQLite config
      url: 'http://posttestserver.com/post.php?dir=cordova-background-geolocation',
      method: 'POST',
      autoSync: true,
      maxDaysToPersist: 1,
      headers: {
          "X-FOO": "bar"
      },
      params: {
          // "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      }
  }

  // `configure` calls `start` internally
    $cordovaBackgroundGeolocation.configure(options)
    .then(
      null, // Background never resolves
      function (err) { // error callback
        console.error(err);
      },
      function (location) { // notify callback
        console.log(location);
      });

  // The plugin is typically toggled with some button on your UI.
  $scope.onToggleEnabled = function() {
    console.log($cordovaBackgroundGeolocation)
      $cordovaBackgroundGeolocation.start();
  }
  $scope.onToggleDsiabled = function() {
      console.log($cordovaBackgroundGeolocation)
      $cordovaBackgroundGeolocation.stop();
      
  }

  //$cordovaBackgroundGeolocation.on('location', callbackFn, failureFn);

})


.factory('appServices', function($http) {
  var baseURL = "http://appocta.com/demo/unrealdeals/web.php?";
  // Might use a resource here that returns a JSON array
  return {
    sendData: function(latLng) {
      return $http({
        url:"",
        method:"POST",
        params:latLng
      });
    }
  }
})
