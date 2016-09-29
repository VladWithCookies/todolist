angular.module('app.projectList', [])

.controller('ProjectListCtrl', ['$scope', '$http', '$resource', '$location', 'Projects', 'Project', 'Tasks', 'Task', function($scope, $http, $resource, $location, Projects, Project, Tasks, Task) {
  $scope.projects = Projects.query();
  $scope.tasks = []
  
  $scope.delete = function(project) {
    Project.delete({id: project.id}, function() {
      $scope.projects.splice($scope.projects.indexOf(project), 1)
    })
  }

  $scope.addTask = function(project) {
    Tasks.create({ project_id: project.id, task: $scope.tasks[project.id] }, function(task) {
      project.tasks.push(task)
      $scope.tasks = {}
    });
  }

  $scope.deleteTask = function(task) {
    Task.delete({ id: task.id }, function() {
      $scope.projects = Projects.query();
    })
  }

  $scope.mark = function(task) {
    Task.mark({ id: task.id });
  }

  $scope.update = function() {
    Project.update({ id: $scope.project.id, project: $scope.project }, function() {
      $location.path('/')
    })
  }

  $scope.priorityUp = function(task) {
    Task.priority_up({ id: task.id }, function() {
      $scope.projects = Projects.query();
    })
  }

  $scope.priorityDown = function(task) {
    Task.priority_down({ id: task.id }, function() {
      $scope.projects = Projects.query();
    })
  }
}]);