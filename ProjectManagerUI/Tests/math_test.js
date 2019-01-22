/// <reference path="../scripts/jasmine/jasmine.js" />
/// <reference path="../scripts/angular.min.js" />
/// <reference path="../scripts/angular-mocks.js" />
/// <reference path="../calc.js" />

describe('SummingModule', function() {
        var scope, controller;

        beforeEach(module('SummingModule'));

    describe('SumController', function () {
        angular.module('ngRoute', []);
                beforeEach(inject(function($rootScope, $controller) {
                    scope = $rootScope.$new();

                    controller = $controller('SumController',
                        {
                            $scope: scope
                        });
                }));

                it('Add two numbers',
                    function() {
                        var result = scope.sum(2, 3);
                        expect(result).toEqual(5);
                    });
            });
    });

    

