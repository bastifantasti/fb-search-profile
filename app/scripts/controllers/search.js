'use strict';

angular.module('fbsearchprofileApp')
  .controller('SearchCtrl', function ($scope,Facebook,Userdata,Searchdata,$rootScope) {
    $scope.user;
    $scope.result;

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

        $scope.$watch('result', function() {
           console.log("change");
           console.log($scope.result);

        });


        $scope.search = function(){
            var keyword = $('#searchword' ).val();
            var type = $('#content-type' ).val();
            $('.example-animate-container li').remove();
            Searchdata.clearResult();


            switch(type){
                case 'photo': searchPhoto(keyword);break;
                case 'posting': searchStatus(keyword);break;
                case 'link': searchLink(keyword);break;
                case 'video': searchVideo(keyword);break;
                case 'stream': searchStream(keyword);searchStreamMedia(keyword);break;
                case 'all': searchPhoto(keyword);searchStatus(keyword);searchStream(keyword);searchStreamMedia(keyword);searchLink(keyword);searchVideo(keyword);break;
                default: break;
            }
        }

        var searchPhoto = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT link,src_big,caption,created,comment_info.comment_count,like_info.like_count FROM photo WHERE owner = me() AND strpos(lower(caption ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                   // console.log(response);
                   // $scope.photos = response;
                    Searchdata.addFBPhotos(response).then(function(done) {
                        $scope.result = Searchdata.getResult();
                    });;
                });
            });

        }
        var searchStream = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT permalink, message,created_time,comment_info.comment_count,like_info.like_count FROM stream WHERE source_id = me() AND strpos(lower(message) ,"'+val.toLowerCase()+'") >=0'
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                  //  $scope.stream = response;
                    Searchdata.addFBStream(response).then(function(done) {
                        $scope.result = Searchdata.getResult();
                    });;
                });
            });
        };
        var searchStreamMedia = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT permalink,attachment,message,created_time,like_info.like_count,comment_info.comment_count,type FROM stream WHERE source_id= me() AND strpos(lower(attachment.description) ,"'+val.toLowerCase()+'") >=0'
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log(response);
                    //$scope.streamMedia = response;
                    Searchdata.addFBStreamMedia(response).then(function(done) {
                        $scope.result = Searchdata.getResult();
                    });;
                });
            });
        };
        var searchStatus = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT message,time,status_id,like_info.like_count,comment_info.comment_count FROM status WHERE uid = me() AND strpos(lower(message ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    //console.log(response);
                    //$scope.status = response;
                    Searchdata.addFBStatus(response).then(function(done) {
                        $scope.result =Searchdata.getResult();
                    });;
                });
            });
        };

        var searchLink = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT owner_comment,created_time,url,picture,like_info.like_count,comment_info.comment_count FROM link WHERE owner = me() AND strpos(lower(owner_comment ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log("FB LINK");
                    console.log(response);
                    //$scope.status = response;
                    Searchdata.addFBLink(response).then(function(done) {
                        $scope.result = Searchdata.getResult();
                    });
                });
            });
        };

        var searchVideo = function (val){

            Facebook.api({
                method: 'fql.query',
                query: 'SELECT description,created_time,link,thumbnail_link FROM video WHERE owner = me() AND strpos(lower(description ) ,"'+val.toLowerCase()+'") >=0 '
            }, function(response){
                $scope.$apply(function () {
                    // Here you could re-check for user status (just in case)
                    console.log("FB Video");
                    console.log(response);
                    //$scope.status = response;
                    Searchdata.addFBLink(response).then(function(done) {
                        $scope.result = Searchdata.getResult();
                    });
                });
            });
        };
  });
