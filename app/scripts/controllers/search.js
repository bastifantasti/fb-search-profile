'use strict';

angular.module('fbsearchprofileApp')
  .controller('SearchCtrl', function ($scope,Facebook,Userdata) {
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

        $scope.search = function(){
            var keyword = $('#searchword' ).val();
            var type = $('#content-type' ).val();

            switch(type){
                case 'photo': searchPhoto(keyword);break;
                case 'posting': searchStatus(keyword);break;
                case 'stream': searchStream(keyword);searchStreamMedia(keyword);break;
                default: break;
            }
        }

        var searchPhoto = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT link,src_big,caption FROM photo WHERE owner = me() AND strpos(lower(caption ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    $scope.photos = response;
                });
            });

        }
        var searchStream = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT actor_id, message FROM stream WHERE source_id = me() AND strpos(lower(message) ,"'+val.toLowerCase()+'") >=0'
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    $scope.stream = response;
                });
            });
        }
        var searchStreamMedia = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT post_id, actor_id, target_id,like_info,permalink,type,created_time,attachment,message FROM stream WHERE source_id= me() AND strpos(lower(attachment.description) ,"'+val.toLowerCase()+'") >=0'
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    $scope.streamMedia = response;
                });
            });
        }
        var searchStatus = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT message,time,status_id FROM status WHERE uid = me() AND strpos(lower(message ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    $scope.status = response;
                });
            });
        }
  });
