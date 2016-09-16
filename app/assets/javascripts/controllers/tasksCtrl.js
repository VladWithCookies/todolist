angular.module('app.task', [])

.controller('TaskCtrl', [
  '$scope', 
  '$http', 
  '$resource', 
  '$location',
  'Task',
  '$stateParams',
  'Comments', 
  'Comment',

function($scope, $http, $resource, $location, Task, $stateParams, Comments, Comment) {
  $scope.task = Task.get({ id: $stateParams.id })
  $scope.comment = {}

  $scope.addComment = function(taskID) {
    Comments.create({ task_id: taskID, comment: $scope.comment }, function() {
      $scope.task = Task.get({ id: $stateParams.id });
      $scope.comment = {}
    });
  }

  $scope.deleteComment = function(commentID) {
    Comment.delete({ id: commentID }, function() {
      $scope.task = Task.get({ id: $stateParams.id });
    })      
  }

  $scope.addDeadline = function(taskID) {
    Task.deadline({ id: taskID, deadline: $scope.task.deadline }, function() {
      $scope.task = Task.get({ id: $stateParams.id });
    })
  }

  $scope.update = function() {
    Task.update({ id: $scope.task.id, task: $scope.task }, function() {
      $location.path('/')
    })
  }

}]);
