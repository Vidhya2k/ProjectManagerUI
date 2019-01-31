/// <reference path="../../scripts/jasmine/jasmine.js" />
/// <reference path="../../scripts/angular.min.js" />
/// <reference path="../../scripts/angular-mocks.js" />
/// <reference path="../../scripts/angular.js" />
/// <reference path="../../scripts/angular-route.js" />
/// <reference path="../../scripts/angular-route.min.js" />
/// <reference path="../../scripts/jquery-1.9.0.js" />
/// <reference path="../../scripts/bootstrap.js" />
/// <reference path="../../taskManagerService.js" />


//'use strict';
//1.
describe('Testing a TaskManagerService',
    function() {
        var taskApi;
        var httpBackend;

        //2.
        beforeEach(function() {
            //3. load the module.

            module('TaskManagerService');
            // 4. get your service, also get $httpBackend
            // $httpBackend will be a mock.
            inject(function(TaskApi, _$httpBackend_) {
                taskApi = TaskApi;
                httpBackend = _$httpBackend_;
                httpBackend.verifyNoOutstandingRequest();
            });
        });

        // 5. make sure no expectations were missed in your tests.
        afterEach(function() {
            httpBackend.flush();
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('This is a simple test',
            function() {
                expect(2 + 2).toEqual(4);
            });

        // A simple test to verify the Users service exists
        it('should service exist',
            function() {
                expect(taskApi).toBeDefined();
            });
    });


// KICK OFF JASMINE
var jasmineEnv = jasmine.getEnv();
var trivialReporter = new jasmine.TrivialReporter();

jasmineEnv.addReporter(trivialReporter);

jasmineEnv.specFilter = function (spec) {
    return trivialReporter.specFilter(spec);
};

jasmineEnv.execute();









