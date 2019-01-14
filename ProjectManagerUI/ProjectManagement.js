/// <reference path="scripts/angular.js" />

var ProjectManagerApplication = angular.module("ProjectManagerApplication", ['ngRoute', 'TaskManagerService', 'ProjectManagerService', 'UserManagerService']);

ProjectManagerApplication.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/AddTask',
            {
                templateUrl: 'Views/addTask.html',
                controller: 'AddTaskController'
            }).when('/AddProject',
            {
                templateUrl: 'Views/addProject.html',
                controller: 'AddProjectController'
            }).when('/AddUser',
            {
                templateUrl: 'Views/addUser.html',
                controller: 'AddUserController'
            }).when('/ViewTask',
            {
                templateUrl: 'Views/viewTask.html',
                controller: 'ViewTaskController'
            }).when('/AddTask/:id',
            {
                templateUrl: 'Views/addTask.html',
                controller: 'AddTaskController'
            }).otherwise({
            redirectTo: '/ViewTask'
        });
    }
]);

ProjectManagerApplication.controller("AddTaskController", function ($scope, TaskApi, ProjectManagerApi, UserManagerApi, $routeParams) {

    $scope.RecordToEdit = $routeParams.id; // get the parameter
    $scope.Selected_Project_Id = null;
    $scope.Selected_User_Id = null;
    getProjects();
    getUsers();

    if ($routeParams.id > 0) {
        getTaskById();
    } else {
        initialize();
    }

    function getTaskById() {
        document.getElementById('addButton').style.display = "none";
        document.getElementById('editButton').style.display = "block";
        TaskApi.getTasksById($routeParams.id).then(function (task) {
            $scope.Task_Description = task.data.Task_Description;
            $scope.Priority = task.data.Priority;
            $scope.Parent_ID = task.data.Parent_ID;
            $scope.Start_Date = new Date(task.data.Start_Date);
            $scope.End_Date = new Date(task.data.End_Date);
            $scope.Task_Id = task.data.Task_Id;
            $scope.Status = task.data.Status;
            $scope.Selected_Project_Id = task.data.Parent_Id;
            $scope.Selected_User_Id = task.data.User_Id;
        });
    }  

    $scope.addTask = function () {
        document.getElementById('addButton').style.display = "block";
        document.getElementById('editButton').style.display = "none";
        if (validateUserData() && validateDates()) {
            var taskToAdd = {
                'Task_Description': $scope.Task_Description,
                'Priority': $scope.Priority,
                'Start_Date': $scope.Start_Date,
                'End_Date': $scope.End_Date,
                'Status': 'New',
                'Project_Id': $scope.Selected_Project_Id,
                'User_Id': $scope.Selected_User_Id
            };
            TaskApi.addTask(taskToAdd)
                .then(function(response) {
                    alert("Task added successfully!!");
                    initialize();
                });
        }
    };

    $scope.editTask = function () {
        if (validateUserData() && validateDates()) {
            var taskToEdit = {
                'Task_Description': $scope.Task_Description,
                'Priority': $scope.Priority,
                'Start_Date': $scope.Start_Date,
                'End_Date': $scope.End_Date,
                'Task_Id': $scope.Task_Id,
                'Status': $scope.Status,
                'Project_Id': $scope.Selected_Project_Id,
                'User_Id': $scope.Selected_User_Id
            };
            TaskApi.editTask(taskToEdit)
                .then(function (response) {
                    alert("Task updated successfully!!");
                    initialize();
                });
        }
    };

    $scope.resetTask = function () {
        initialize();
    };

    $scope.enableParentTaskFields = function() {
        var check = document.getElementById('checkBoxParentTask');
        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        var inputPriority = document.getElementById('inputPriority');
        var inputParentTask = document.getElementById('inputParentTask');
        var inputParentTaskSearch = document.getElementById('inputParentTaskSearch');


        if (check.checked) {
            startDate.disabled = true;
            endDate.disabled = true;
            inputPriority.disabled = true;
            inputParentTaskSearch.disabled = true;
        } else {
            startDate.disabled = false;
            endDate.disabled = false;
            inputPriority.disabled = false;
            inputParentTaskSearch.disabled = false;
        }
    }

    $scope.searchTasksBy = function (project) {
        $scope.Project_Search_Text = project.Project_Description;
        $scope.Selected_Project_Id = project.Project_Id;
    };

    $scope.populateSelectedUser = function (user) {
        $scope.User_Name = user.First_Name + ' ' + user.Last_Name;
        $scope.Selected_User_Id = user.User_Id;
    };

    function getProjects() {
        ProjectManagerApi.getProjects().then(function (projects) {
            $scope.projects = projects.data;
        });
    }

    function getUsers() {
        UserManagerApi.getUsers().then(function (users) {
            $scope.users = users.data;
        });
    }

    function initialize() {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        $scope.Start_Date = today;
        $scope.End_Date = tomorrow;
        $scope.Task_Description = undefined;
        $scope.Priority = 0;
        $scope.Parent_ID = undefined;
        document.getElementById('addButton').style.display = "block";
        document.getElementById('editButton').style.display = "none";
        $scope.Selected_Project_Id = null;
        $scope.Selected_User_Id = null;
    }

    function validateUserData() {
        if ($scope.Task_Description === undefined ||
            $scope.Task_Description === '') {
            alert("Task Description is mandatory");
            return false;
        }
        return true;
    }

    function validateDates() {
        var isValid = true;
        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        if (endDate.value < startDate.value) {
            isValid = false;
            alert("Start date should be less than end date");
        }
        return isValid;
    }
});

ProjectManagerApplication.controller("AddProjectController", function ($scope, ProjectManagerApi, UserManagerApi) {
  
    initialize();
    getProjects();
    getUsers();

    $scope.addProject = function() {
        if (validateUserData() && validateDates()) {
            var projectToAdd = {
                'Project_Description': $scope.Project_Description,
                'Priority': $scope.Priority,
                'Start_Date': $scope.Start_Date,
                'End_Date': $scope.End_Date
            };
            ProjectManagerApi.addProject(projectToAdd)
                .then(function(response) {
                    alert("Project added successfully!!");
                    initialize();
                    getProjects();
                });
        }
    };

    $scope.resetProject = function () {
        initialize();
    };

    $scope.enableDates = function () {
        var check = document.getElementById('checkBoxEnableDate');
        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        if (check.checked) {
            startDate.disabled = false;
            endDate.disabled = false;
            var today = new Date();
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            startDate.valueAsDate = today;
            endDate.valueAsDate = tomorrow;
        } else {
            startDate.disabled = true;
            endDate.disabled = true;
            startDate.value = undefined;
            endDate.value = undefined;
        }
    }

    $scope.editProject = function(project) {
        $scope.Project_Description = project.Project_Description;
        $scope.Start_Date = new Date(project.Start_Date);
        $scope.End_Date = new Date(project.End_Date);
        $scope.Priority = project.Priority;
        $scope.Project_Id = project.Project_Id;
        
        document.getElementById('addButton').style.display = "none";
        document.getElementById('editButton').style.display = "block";
    }

    $scope.updateProject = function() {
        if (validateUserData() && validateDates()) {
            var projectToBeUpdated = {
                'Project_Description': $scope.Project_Description,
                'Priority': $scope.Priority,
                'Start_Date': $scope.Start_Date,
                'End_Date': $scope.End_Date,
                'Project_Id': $scope.Project_Id
            };
            ProjectManagerApi.editProject(projectToBeUpdated)
                .then(function (response) {
                    alert("Project updated successfully!!");
                    initialize();
                    getProjects();
                });
        }
    }
    
    $scope.populateSelectedUser = function (user) {
        $scope.User_Name = user.First_Name + ' ' + user.Last_Name;
        $scope.Selected_User_Id = user.User_Id;
    };

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    function getProjects() {
        ProjectManagerApi.getProjects().then(function (projects) {
            $scope.projects = projects.data;
        });
    }

    function getUsers() {
        UserManagerApi.getUsers().then(function (users) {
            $scope.users = users.data;
        });
    }

    function initialize() {
        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        var check = document.getElementById('checkBoxEnableDate');
        document.getElementById('addButton').style.display = "block";
        document.getElementById('editButton').style.display = "none";

        startDate.disabled = true;
        endDate.disabled = true;
        $scope.Priority = 0;
        check.checked = false;
        $scope.Project_Description = undefined;
        startDate.value = undefined;
        endDate.value = undefined;
    }


    function validateDates() {
        var isValid = true;
        var check = document.getElementById('checkBoxEnableDate');
        var startDate = document.getElementById('startDate');
        var endDate = document.getElementById('endDate');
        if (check.checked)
        {
            if (endDate.value < startDate.value) {
                isValid = false;
                alert("Start date should be less than end date");
            }
        } 
        return isValid;
    }

    function validateUserData() {
        if ($scope.Project_Description === undefined ||
            $scope.Project_Description === '' ) {
            alert("Project Description is mandatory");
            return false;
        }
        return true;
    }
});

ProjectManagerApplication.controller("AddUserController", function ($scope, UserManagerApi) {
    getUsers();
    document.getElementById('editButton').style.display = "none";

    $scope.addUser = function () {
        if (validateUserData()) {
            var projectToAdd = {
                'First_Name': $scope.First_Name,
                'Last_Name': $scope.Last_Name,
                'Employee_ID': $scope.Employee_ID
            };
            UserManagerApi.addUser(projectToAdd)
                .then(function(response) {
                    alert("User added successfully!!");
                    $scope.First_Name = undefined;
                    $scope.Last_Name = undefined;
                    $scope.Employee_ID = undefined;
                    document.getElementById('addButton').style.display = "block";
                    document.getElementById('editButton').style.display = "none";
                    getUsers();
                });
        }
    };

    function validateUserData() {
        if ($scope.First_Name === undefined ||
            $scope.Last_Name === undefined ||
            $scope.Employee_ID === undefined ||
            $scope.First_Name === '' ||
            $scope.Last_Name === '' ||
            $scope.Employee_ID === '') {
            alert("All the input fields are mandatory");
            return false;
        }
        return true;
    }

    $scope.resetUser = function () {
        $scope.First_Name = undefined;
        $scope.Last_Name = undefined;
        $scope.Employee_ID = undefined;
        document.getElementById('addButton').style.display = "block";
        document.getElementById('editButton').style.display = "none";
    };

    function getUsers() {
        UserManagerApi.getUsers().then(function (users) {
            $scope.users = users.data;
        });
    }

    $scope.sortBy = function (propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.deleteUser = function (user) {
        if (confirm("Are you sure you delete the selected user?")) {
            UserManagerApi.deleteUser(user.User_Id)
                .then(function (response) {
                    alert("User deleted successfully!!");
                    getUsers();
                });
        }
    };

    $scope.editUser = function (user) {
        $scope.First_Name = user.First_Name;
        $scope.Last_Name = user.Last_Name;
        $scope.Employee_ID = user.Employee_Id;
        $scope.User_ID = user.User_Id;

        document.getElementById('addButton').style.display = "none";
        document.getElementById('editButton').style.display = "block";
    };


    $scope.updateUser = function() {
        if (validateUserData()) {
            var projectToUpdate = {
                'First_Name': $scope.First_Name,
                'Last_Name': $scope.Last_Name,
                'Employee_ID': $scope.Employee_ID,
                'User_ID': $scope.User_ID
            };
            UserManagerApi.editUser(projectToUpdate)
                .then(function(response) {
                    alert("User updated successfully!!");
                    $scope.First_Name = undefined;
                    $scope.Last_Name = undefined;
                    $scope.Employee_ID = undefined;
                    document.getElementById('addButton').style.display = "block";
                    document.getElementById('editButton').style.display = "none";
                    getUsers();
                });
        };
    }

});

ProjectManagerApplication.controller("ViewTaskController", function($scope, TaskApi, ProjectManagerApi) {

        getTasks();
        $scope.Project_Search_Text = '';

        function getTasks() {
            TaskApi.getTasks().then(function(tasks) {
                $scope.tasks = tasks.data;
            });
        }

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.searchTaskByProject = function() {
            getProjects();
        };

        $scope.searchTasksBy = function(project) {
            $scope.Project_Search_Text = project.Project_Description;
        };

        function getProjects() {
            ProjectManagerApi.getProjects().then(function(projects) {
                $scope.projects = projects.data;
            });
        }

        $scope.endTask = function(task) {
            var taskToEdit = {
                'Task_Description': task.Task_Description,
                'Priority': task.Priority,
                'Start_Date': task.Start_Date,
                'End_Date': task.End_Date,
                'Status': 'Complete',
                'Task_Id': task.Task_Id,
                'Project_Id': task.Project_Id,
                'User_Id': task.User_Id
            };
            TaskApi.editTask(taskToEdit)
                .then(function(response) {
                    alert("Task ended successfully!!");
                });
            getTasks();
        };
    });
