/// <reference path="scripts/angular.js" />

var MyApp = angular.module('SummingModule', ['ngRoute']);

MyApp.controller('SumController', function($scope) {

        $scope.sum = function add(a, b) {
            return a + b;
        }
    });

