angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, QRScanService) {
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
  })

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

  .controller('QRScanCtrl', function ($scope, QRScanService, $ionicPopup) {
    /**
     * QRReader code
     */
    console.log('QRScan CTRL');

      // Trigger the scan action
    $scope.scanQR = function(){
      console.log('Start Scan QR');
      QRScanService.scan(function(result){
        console.log('Success');
        $ionicPopup.alert({
          title: 'YOU GOT QR',
          template: 'Data: ' + result.text
        });
      }, function(error){
        $ionicPopup.alert({
          title: 'Unable to scan the QR code',
          template: 'Too bad, something went wrong.'
        });
      });
    };

    // accept the QR Code result
    $scope.saveQR = function(){

    };
  })

/**
 *  Card Controller for Tinder-like Offer approval
 */
  .controller('CardsCtrl', function ($scope, TDCardDelegate) {
    console.log('CARDS CTRL');
    var offers = [
      {name         : '1989',
        icon        : 'img/offer-icon-1.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {name         : 'Red',
        icon        : 'img/offer-icon-2.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {name         : 'Speak Now',
        icon        : 'img/offer-icon-3.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      },
      {name         : 'Fearless',
        icon        : 'img/offer-icon-4.jpg',
        description : 'Cras justo odio, dapibus ac facilisis in, egestas eget quam.'
      }
    ];

    $scope.cards = Array.prototype.slice.call(offers, 0);

    $scope.cardDestroyed = function(index) {
      $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
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

  .controller('OffersApprovalCtrl', function ($scope) {
  })

  .controller('PushNotificationCtrl', function ($scope, $cordovaPush) {
  })

  .controller('SocialSharingCtrl', function ($scope, $cordovaSocialSharing) {
  });
