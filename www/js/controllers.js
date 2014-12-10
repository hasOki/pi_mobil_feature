angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, QRScanService, $cordovaToast, $ionicPopup) {
    console.log('App CTRL');
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope : $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };

    $scope.$on('pushNotificationReceived', function (event, notification) {

      // process notification
      $cordovaToast.showShortCenter('You Got New Notification : ' + notification).then(function (result) {
        // Success!
        console.log('Success showing Toast');
      }, function (err) {
        // An error occurred. Show a message to the user
        $ionicPopup.alert({
          title    : 'ERROR',
          template : err
        });
      });
    });
  })

/**
 * QRScan Service
 */
  .factory('QRScanService', function () {
    return {
      scan : function (success, fail) {
        console.log('Scanning');
        cordova.plugins.barcodeScanner.scan(
          function (result) {
            console.log('Success');
            success(result);
          },
          function (error) {
            console.log('Failed');
            fail(error);
          }
        )
      }
    }
  })

/**
 * QR Scanner Controller to get the login credential
 */
  .controller('QRScanCtrl', function ($scope, $cordovaBarcodeScanner, $ionicPopup) {
    /**
     * QRReader code
     */
    console.log('QRScan CTRL');

    // Trigger the scan action
    $scope.scanQR = function () {
      console.log('Start Scan QR');
      $cordovaBarcodeScanner.scan()
        .then(function (result) {
          console.log('Success');
          if (result.cancelled) {
            $ionicPopup.alert({
              title    : 'NO QR FOR YOU',
              template : 'You canceled the Scan Process'
            });
          } else {
            $ionicPopup.alert({
              title    : 'YOU GOT QR',
              template : 'Data: ' + result.text
            });
          }
        }, function (error) {
          $ionicPopup.alert({
            title    : 'Unable to scan the QR code',
            template : 'Too bad, something went wrong.'
          });
        });
    };

    // accept the QR Code result
    $scope.saveQR = function () {

    };
  })

/**
 *  Card Controller for Tinder-like Offer approval
 */
  .controller('CardsCtrl', function ($scope, TDCardDelegate) {
    console.log('Cards CTRL');
    var offers = [
      {
        name        : '1989',
        icon        : 'img/offer-icon-1.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {
        name        : 'Red',
        icon        : 'img/offer-icon-2.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {
        name        : 'Speak Now',
        icon        : 'img/offer-icon-3.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {
        name        : 'Fearless',
        icon        : 'img/offer-icon-4.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      }
    ];

    $scope.cards = Array.prototype.slice.call(offers, 0);

    $scope.cardDestroyed = function (index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function () {
      var newCard = offers[Math.floor(Math.random() * offers.length)];
      newCard.id = Math.random();
      $scope.cards.push(angular.extend({}, newCard));
    }
  })
  .controller('CardCtrl', function ($scope, TDCardDelegate) {
    $scope.cardSwipedLeft = function (index) {
      console.log('LEFT SWIPE');
      $scope.addCard();
    };
    $scope.cardSwipedRight = function (index) {
      console.log('RIGHT SWIPE');
      $scope.addCard();
    };
  })

/**
 * Push Notification Controller for Device Level Push Notification
 */
  .controller('PushNotificationCtrl', function ($scope, $cordovaPush, $ionicPopup, $cordovaDevice) {
    console.log('PushNotification CTRL');
    var pushNotificationCtrl = this;

    var androidConfig = {
      "senderID" : "289735507660" // Sender ID from Google Play Dev Console
    };

    var iosConfig = {
      "badge" : "true",
      "sound" : "true",
      "alert" : "true"
    };

    // (optional) custom notification handler
    // If you set "ecb" in the config object, the 'pushNotificationReceived' angular
    // event will not be broadcast.
    // You will be responsible for handling the notification and passing it to your
    // contollers/services
    // androidConfig.ecb = "myCustomOnNotificationHandler";
    // iosConfig.ecb = "myCustomOnNotificationAPNHandler";

    // assign the config based on the device platform
    var config;
    var devicePlatform = $cordovaDevice.getPlatform();
    switch (devicePlatform) {
      case 'Android':
        config = androidConfig;
        break;

      case 'iOS':
        config = iosConfig;
        break;
    }

    $scope.registerToNotification = function () {
      console.log('Register Notification');
      $cordovaPush.register(config).then(function (deviceID) {
        // Success!
        console.log(deviceID);

        /**
         * IOS Notes :
         * ===========
         * DeviceID will be need to be registered to the API and send to the SNS server
         * to allow the device to receive Push Notification.
         */

        $ionicPopup.alert({
          title    : 'SUCCESS',
          template : 'Register to Push Notification'
        });
      }, function (err) {
        // An error occurred. Show a message to the user
        $ionicPopup.alert({
          title    : 'ERROR',
          template : err
        });
      });
    };

    var options = {};
    $scope.unregisterToNotification = function () {
      console.log('Unregister Notification');
      $cordovaPush.unregister(options).then(function (result) {
        // Success!
        $ionicPopup.alert({
          title    : 'SUCCESS',
          template : 'Unregister to Push Notification'
        });
      }, function (err) {
        // An error occurred. Show a message to the user
        $ionicPopup.alert({
          title    : 'ERROR',
          template : 'Error Unergistering Push Notification'
        });
      });
    };

    $scope.setBadgeCount = function (newCount) {
      if (devicePlatform === 'iOS') {
        console.log('Set Badge Count - iOS Only');
        // iOS only
        $cordovaPush.setBadgeNumber($scope.badgeCounter).then(function (result) {
          // Success!
          $ionicPopup.alert({
            title    : 'BADGE Number Update',
            template : 'Set Badge Number to ' + $scope.badgeCounter
          });
        }, function (err) {
          // An error occurred. Show a message to the user
          $ionicPopup.alert({
            title    : 'ERROR',
            template : 'Error Setting Up Badge Number'
          });
        });
      }
    };

  })

/**
 * Social Sharing Controller to use Native Share in the device
 */
  .controller('SocialSharingCtrl', function ($scope, $cordovaSocialSharing, $cordovaToast, $ionicPopup) {
    console.log('Social Sharing CTRL');

    var socialSharingCtrl = this;

    $scope.shareWithTwitter = function () {
      console.log('Share with Twitter');

      $cordovaSocialSharing.shareViaTwitter($scope.message, '', 'http://www.tune.com')
        .then(function (result) {
          $cordovaToast.showShortCenter('Twitter Sent');
        }, function (err) {
          $ionicPopup.alert({
            title    : 'ERROR',
            template : 'Error sending to Twitter'
          });
        });
    };

    $scope.shareWithEmail = function () {
      console.log('Share with Email');

      $cordovaSocialSharing.shareViaEmail($scope.message, 'A Message from your Mobile App')
        .then(function (result) {
          $cordovaToast.showShortCenter('Email Sent');
        }, function (err) {
          $ionicPopup.alert({
            title    : 'ERROR',
            template : 'Error sending to Twitter'
          });
        });
    };
  });
