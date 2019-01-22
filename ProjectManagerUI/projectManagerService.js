/// <reference path="scripts/angular.js" />

var ProjectManagerService = angular.module('ProjectManagerService', []);

ProjectManagerService.factory('ProjectManagerApi', function ($http) {

    var urlBase = "http://localhost/ProjectManagerService/api";
    var projectManagerApi = {};

    projectManagerApi.getProjects = function () {
        var url = urlBase + '/project';
        var result = $http.get(url);
        return result;
    };

    projectManagerApi.getProjectById = function (projectId) {
        var url = urlBase + '/project/' + projectId;
        var result = $http.get(url);
        return result;
    };

    projectManagerApi.addProject = function (project) {
        var url = urlBase + '/project';
        return $http.post(url, project);
    };

    projectManagerApi.editProject = function (project) {
        var url = urlBase + '/project/' + project.Project_Id;
        return $http.put(url, project);
    };

    return projectManagerApi;
});