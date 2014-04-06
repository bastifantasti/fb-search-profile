'use strict';

angular.module('fbsearchprofileApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'facebook'
])
  .config(function ($routeProvider, FacebookProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      }).when('/search/:fbuser', {
            templateUrl: 'views/search.html',
            controller: 'SearchCtrl'
        });
        FacebookProvider.init('853938037957081');
  });


