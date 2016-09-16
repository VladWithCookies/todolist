angular.module('app.projectAdd', [])

.controller('ProjectAddCtrl', ['$scope', 'Projects', '$location', '$resource', function($scope, Projects, $location, $resource) {
  $scope.project = {}
    
  $scope.save = function() {
    Projects.create({ project: $scope.project }, function() {
      $location.path('/');
    });
  }
}]);