/// <reference path="scripts/angular.js" />

var UserManagerService = angular.module('UserManagerService', []);

UserManagerService.factory('UserManagerApi', function ($http) {

    var urlBase = "http://localhost/ProjectManagerService/api";
    var UserManagerApi = {};

    UserManagerApi.getUsers = function () {
        var url = urlBase + '/users';
        var result = $http.get(url);
        return result;
    };

    UserManagerApi.getUserById = function (userId) {
        var url = urlBase + '/users/' + userId;
        return  $http.get(url);
    };

    UserManagerApi.addUser = function (user) {
        var url = urlBase + '/users';
        return $http.post(url, user);
    };

    UserManagerApi.editUser = function (user) {
        var url = urlBase + '/users/' + user.User_ID;
        return $http.put(url, user);
    };

    UserManagerApi.deleteUser = function (userId) {
        var url = urlBase + '/users/' + userId;
        return $http.delete(url);
    };

    return UserManagerApi;
});