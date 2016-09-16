angular.module('app.projectUpdate', [])

.controller('ProjectUpdateCtrl', ['$scope', 'Project', '$location', '$resource', '$stateParams', function($scope, Project, $location, $resource, $stateParams) {
  $scope.project = Project.get({ id: $stateParams.id })

  $scope.update = function() {
    Project.update({ id: $scope.project.id, project: $scope.project }, function() {
      $location.path('/')
    })
  }
}]);
