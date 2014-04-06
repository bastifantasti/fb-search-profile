'use strict';

angular.module('fbsearchprofileApp')
  .controller('SearchCtrl', function ($scope,Facebook) {
    $scope.user;

        $scope.me = function () {
            Facebook.api('/me', function (response) {
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    $scope.user = response;
                });
            });
        };
        $scope.me();
  });
