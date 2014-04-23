'use strict';

angular.module('fbsearchprofileApp')
    .controller('MainCtrl', function ($scope, Facebook, Userdata,$location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

        // Here, usually you should watch for when Facebook is ready and loaded
        $scope.$watch(function () {
            return Facebook.isReady(); // This is for convenience, to notify if Facebook is loaded and ready to go.
        }, function (newVal) {
            $scope.facebookReady = true; // You might want to use this to disable/show/hide buttons and else
        });

        // From now on you can use the Facebook service just as Facebook api says
        // Take into account that you will need $scope.$apply when inside a Facebook function's scope and not angular
        $scope.login = function () {
            Facebook.login(function (response) {
                console.log(response.authResponse);
                Userdata.setUserId(response.authResponse.userID);
                Userdata.setUserToken(response.authResponse.accessToken);
                $location.path('/search/'+Userdata.getUserId());
                // Do something with response. Don't forget here you are on Facebook scope so use $scope.$apply
            }, {scope: 'user_status, user_photos, read_stream,user_videos'});
        };

        $scope.getLoginStatus = function () {
            Facebook.getLoginStatus(function (response) {
                if (response.status == 'connected') {
                    $scope.$apply(function () {
                        $scope.loggedIn = true;
                    });
                }
                else {
                    $scope.$apply(function () {
                        $scope.loggedIn = false;
                    });
                }
            });
        };

        $scope.me = function () {
            Facebook.api('/me', function (response) {
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    $scope.user = response;
                });
            });
        };
    });
