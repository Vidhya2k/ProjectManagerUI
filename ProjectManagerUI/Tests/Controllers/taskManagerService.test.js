/// <reference path="../../scripts/jasmine/jasmine.js" />
/// <reference path="../../scripts/angular.min.js" />
/// <reference path="../../scripts/angular-mocks.js" />
/// <reference path="../../scripts/angular.js" />
/// <reference path="../../scripts/angular-route.js" />
/// <reference path="../../scripts/angular-route.min.js" />
/// <reference path="../../scripts/jquery-1.9.0.js" />
/// <reference path="../../scripts/bootstrap.js" />
/// <reference path="../../ProjectManagement.js" />

describe('ProjectManagerApplication',
    function() {
        var scope, controller;
        beforeEach(module('ProjectManagerApplication'));

        beforeEach(function() {
            angular.module('ngRoute', []);
            angular.module('TaskManagerService', []);
            angular.module('ProjectManagerService', []);
            angular.module('UserManagerService', []);
        });

        describe('ViewTaskController',
            function () {
                angular.module('ngRoute', []);
                angular.module('TaskManagerService', []);
                angular.module('ProjectManagerService', []);
                angular.module('UserManagerService', []);

                beforeEach(inject(function($rootScope, TaskApi, ProjectManagerApi, $controller) {
                    scope = $rootScope.$new();
                    controller = $controller('ViewTaskController', { $scope: scope });
                }));
            });
        
        it("Check 42342",
            function() {
                var result = 1;
                expect(result).toEqual(1);
            });

        it("Check Text",
            function () {
                var result = scope.Project_Search_Text;
                expect(result).toEqual('');
            });

    });

    //describe('ViewTaskController', function ($scope, TaskApi, ProjectManagerApi) {

    //    beforeEach(inject(function($rootScope, $controller) {
    //        scope = $rootScope.$new();
    //        controller = $controller('ViewTaskController', { $scope: scope });
    //    }));
    //  it('Check Name',
    //            function() {
    //                expect(scope.start).toEqual('Krishnan');
    //            });
    //    });



