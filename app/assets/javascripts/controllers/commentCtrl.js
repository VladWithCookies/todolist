angular.module('app.comment', [])

.controller('CommentCtrl', [
  '$scope', 
  '$http',
  '$resource',
  '$location', 
  '$stateParams', 
  'Comment', 
  'FileUploader', 

  function($scope, $http, $resource, $location, $stateParams, Comment, FileUploader) {
    $scope.comment = Comment.get({ id: $stateParams.id });
    $scope.uploader = new FileUploader({ url: '/comments/'+ $stateParams.id  +'/add_file' })

    $scope.uploader.onCompleteItem = function(item) {
      $scope.comment = Comment.get({ id: $stateParams.id });
    };
   
  }
]);