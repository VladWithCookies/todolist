angular.module('app.projectList', [])

.controller('ProjectListCtrl', ['$scope', '$http', '$resource', '$location', 'Projects', 'Project', 'Tasks', 'Task', function($scope, $http, $resource, $location, Projects, Project, Tasks, Task) {
  $scope.projects = Projects.query();
  $scope.tasks = []
  
  $scope.delete = function(projectID) {
    Project.delete({id: projectID}, function() {
      $scope.projects = Projects.query();
      $location.path('/');
    })
  }

  $scope.addTask = function(projectID) {
    Tasks.create({ project_id: projectID, task: $scope.tasks[projectID] }, function() {
      $scope.projects = Projects.query();
      $scope.tasks = {}
    });
  }

  $scope.deleteTask = function(taskID) {
    Task.delete({ id: taskID }, function() {
      $scope.projects = Projects.query();
    })
  }

  $scope.mark = function(taskID) {
    Task.mark({ id: taskID }, function() {
      $scope.projects = Projects.query();
    })
  }

   $scope.update = function() {
    Project.update({ id: $scope.project.id, project: $scope.project }, function() {
      $location.path('/')
    })
  }

  $scope.priorityUp = function(taskId) {
    Task.priority_up({ id: taskId }, function() {
      $scope.projects = Projects.query();
    })
  }

  $scope.priorityDown = function(taskId) {
    Task.priority_down({ id: taskId }, function() {
      $scope.projects = Projects.query();
    })
  }
}]);