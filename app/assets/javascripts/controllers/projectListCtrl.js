angular.module('app.projectList', [])

.controller('ProjectListCtrl', [
  '$scope', 
  '$http', 
  '$resource', 
  '$location',
  '$filter', 
  'Projects', 
  'Project', 
  'Tasks', 
  'Task', 

  function($scope, $http, $resource, $location, $filter, Projects, Project, Tasks, Task) {
    $scope.projects = Projects.query();
    $scope.tasks = []
    
    $scope.delete = function(project) {
      Project.delete({id: project.id}, function() {
        $scope.projects.splice($scope.projects.indexOf(project), 1)
      })
    }

    $scope.addTask = function(project) {
      Tasks.create({ project_id: project.id, task: $scope.tasks[project.id] }, function(task) {
        if (task.title) project.tasks.push(task)
        $scope.tasks = {}
      });
    }

    $scope.deleteTask = function(task, project) {
      Task.delete({ id: task.id }, function() {
        project.tasks.splice(project.tasks.indexOf(task), 1)
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

    $scope.priorityUp = function(task, project) {
      Task.priority_up({ id: task.id }, function() {
        var nextTask = $filter("filter")(project.tasks, { priority: task.priority - 1 })[0];

        if (nextTask.priority >= 0) {
          task.priority -= 1;
          nextTask.priority += 1;
        }
      })
    }

    $scope.priorityDown = function(task, project) {
      Task.priority_down({ id: task.id }, function() {
        var prevTask = $filter("filter")(project.tasks, { priority: task.priority + 1 })[0];

        if (prevTask.priority) {
          task.priority += 1;
          prevTask.priority -=1 ;
        }
      })
    }
  }
]);