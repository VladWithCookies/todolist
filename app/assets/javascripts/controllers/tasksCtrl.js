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

  $scope.addComment = function(task) {
    Comments.create({ task_id: task.id, comment: $scope.comment }, function(comment) {
      task.comments.push(comment)
      $scope.comment = {}
    });
  }

  $scope.deleteComment = function(comment) {
    Comment.delete({ id: comment.id }, function() {
      var comments = $scope.task.comments
      comments.splice(comments.indexOf(comment), 1)
    })      
  }

  $scope.addDeadline = function(task) {
    Task.deadline({ id: task.id, deadline: $scope.task.deadline }, function() {
      $scope.task.deadline = task.deadline
    })
  }

  $scope.update = function() {
    Task.update({ id: $scope.task.id, task: $scope.task }, function() {
      $location.path('/')
    })
  }

}]);
