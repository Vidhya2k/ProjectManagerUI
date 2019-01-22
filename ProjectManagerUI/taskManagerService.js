/// <reference path="scripts/angular.js" />

var TaskManagerService = angular.module('TaskManagerService', []);

TaskManagerService.factory('TaskApi', function ($http) {

    var urlBase = "http://localhost/ProjectManagerService/api";
    var TaskApi = {};

    TaskApi.getTasks = function () {
        var url = urlBase + '/tasks';
        var result = $http.get(url);
        return result;
    };

    TaskApi.getTasksById = function (taskId) {
        var url = urlBase + '/tasks/' + taskId;
        var result = $http.get(url);
        return result;
    };

    TaskApi.addTask = function (task) {
        var url = urlBase + '/tasks';
        return $http.post(url, task);
    };

    TaskApi.editTask = function (task) {
        var url = urlBase + '/tasks/' + task.Task_Id;
        return $http.put(url, task);
    };

    return TaskApi;
});