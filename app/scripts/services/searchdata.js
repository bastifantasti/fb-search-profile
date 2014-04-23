'use strict';

angular.module('fbsearchprofileApp')
    .service('Searchdata', function Searchdata($q, $timeout) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var result = [];
        // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
        var item;

        var getResult = function () {
            return result;
        };

        var clearResult = function () {
            result = [];
        };

        var addResult = function (val) {
            result.push(val);

        };
        var sortByDate = function () {
            //result.sort(dynamicSort("date"));
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(result.sort(dynamicSort("date")));
            }, 1);

            return deferred.promise;
        };
        var sortByLikes = function () {
            // result.sort(dynamicSort("likes"));
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(result.sort(dynamicSort("likes")));
            }, 1);

            return deferred.promise;
        };
        var sortByComments = function () {
            var deferred = $q.defer();

            $timeout(function () {
                deferred.resolve(result.sort(dynamicSort("comments")));
            }, 1);

            return deferred.promise;


        };
        var addFBPhotos = function(fbresponse){
            console.log("Add FB Photos");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function(entry) {
                    console.log(entry);
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.created, link: entry.link, img: entry.src_big, text: entry.caption, type:'photo', likes: entry.like_info.like_count, comments:entry.comment_info.comment_count};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };
        var addFBStatus = function (fbresponse) {
            console.log("Add FB Status");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function (entry) {
                    console.log(entry);
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.time, link: null, img: null, text: entry.message, type: 'status', likes: entry.like_info.like_count, comments: entry.comment_info.comment_count};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };
        var addFBStream = function (fbresponse) {
            console.log("Add FB Stream");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function (entry) {
                    console.log(entry);
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.created_time, link: entry.permalink, img: null, text: entry.message, type: 'stream', likes: entry.like_info.like_count, comments: entry.comment_info.comment_count};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };
        var addFBStreamMedia = function (fbresponse) {
            console.log("Add FB stream Media");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function (entry) {
                    console.log(entry);
                    var imgsrc = null;
                    switch(entry.attachment.fb_object_type){
                        case 'photo' :
                        case 'video' : imgsrc = entry.attachment.media[0].src;break;
                    }
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.created_time, link: entry.permalink, img: imgsrc, text: entry.attachment.description, type: 'media', likes: entry.like_info.like_count, comments: entry.comment_info.comment_count};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };
        var addFBLink = function (fbresponse) {
            console.log("Add FB Link");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function (entry) {
                    console.log(entry);
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.created_time, link: entry.url, img: entry.picture, text: entry.owner_comment, type: 'link', likes: entry.like_info.like_count, comments: entry.comment_info.comment_count};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };
        var addFBVideo = function (fbresponse) {
            console.log("Add FB Video");
            var deferred = $q.defer();

            $timeout(function () {
                fbresponse.forEach(function (entry) {
                    console.log(entry);
                    // item.date, item.link, item.img, item.text, item.type, item.likes, item.comments
                    var obj = {date: entry.created_time, link: entry.link, img: entry.thumbnail_link, text: entry.description, type: 'video', likes: null, comments: null};
                    addResult(obj);
                });
                deferred.resolve(true);
            }, 1);

            return deferred.promise;

        };

        function dynamicSort(property) {
            var sortOrder = 1;
            if (property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a, b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        return {
            getResult: getResult,
            clearResult: clearResult,
            addResult: addResult,
            sortByDate: sortByDate,
            sortByLikes: sortByLikes,
            sortByComments: sortByComments,
            addFBPhotos:addFBPhotos,
            addFBStream:addFBStream,
            addFBStreamMedia:addFBStreamMedia,
            addFBStatus:addFBStatus,
            addFBLink:addFBLink,
            addFBVideo:addFBVideo

        };
    });
