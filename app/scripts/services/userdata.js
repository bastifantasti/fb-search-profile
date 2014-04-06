'use strict';

angular.module('fbsearchprofileApp')
  .service('Userdata', function Userdata() {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userId;
    var userToken;
    var userName;

    var getUserId = function () {
        return userId;
    };
    var setUserId = function (val) {
        userId = val;
    };
    var getUserToken = function () {
        return userToken;
    };
    var setUserToken = function (val) {
        userToken = val;
    };
    var getUserName = function () {
        return userName;
    };
    var setUserName = function (val) {
        userName = val;
    };

    return {
        getUserId:getUserId,
        setUserId:setUserId,
        getUserToken:getUserToken,
        setUserToken:setUserToken,
        getUserName:getUserName,
        setUserName:setUserName

    };
  });
