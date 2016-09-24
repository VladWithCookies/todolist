angular.module('app.auth', [])

.config(function($httpProvider) {
  var interceptor = function($q, $location, $rootScope) {
    return {
      'responseError': function(rejection) {
        if(rejection.status == 401) {
          $rootScope.$broadcast('event:unauthorized');
          $location.path('/login')
        }
        return $q.reject(rejection);
      }
    }
  }
  $httpProvider.interceptors.push(interceptor);
})

.controller('AuthCtrl', ['$scope', '$http', '$state', 'Users', 'flash', function($scope, $http, $state, Users, flash) {
  $scope.login_user = { email: null, password: null };
  $scope.register_user = { email: null, password: null, password_confirmation: null};
  $scope.register_error = { message: null, errors: {}};
  $scope.login_error = { message: null, errors: {}};  
  $scope.currentUser = Users.get_current_user();
  $scope.flash = flash;

  $scope.login = function() {
    $scope.submit({
      method: 'POST',
      url: '../users/sign_in.json',
      data: { user: { email: $scope.login_user.email, password: $scope.login_user.password }},
      success_message: "You have been logged in.",
      error_entity: $scope.login_error
    });
  };  

  $scope.logout = function() {
    $scope.submit({
      method: 'DELETE', 
      url: '../users/sign_out.json', 
      success_message: "You have been logged out.",
      error_entity: $scope.login_error
    });
  };

  $scope.register = function() {
    $scope.submit({ 
      method: 'POST', 
      url: '../users.json',
      data: {
        user: {
          email: $scope.register_user.email,
          password: $scope.register_user.password,
          password_confirmation: $scope.register_user.password_confirmation 
        }  
      },
      success_message: "You have been registered and logged in.",
      error_entity: $scope.register_error                   
    });
  }

  $scope.submit = function(parameters) {
    $scope.reset_messages();

    $http({ method: parameters.method, url: parameters.url, data: parameters.data })
    .success(function(data, status){
      if (status == 201 || status == 204){
        $scope.currentUser = Users.get_current_user();      
        flash.setMessage(parameters.success_message);
        $scope.reset_users();
        $state.go('list');
      } else if (data.error) {
        parameters.error_entity.message = data.error;
      }
    })
    .error(function(data, status){
      if (status == 422) {
        parameters.error_entity.errors = data.errors;          
      } else if (data.error) {
        parameters.error_entity.message = data.error;    
      }
    });
  };

  $scope.reset_messages = function() {
    $scope.login_error.message = null;
    $scope.login_error.errors = {};
    $scope.register_error.message = null;
    $scope.register_error.errors = {};    
  };

  $scope.reset_users = function() {
    $scope.login_user.email = null;
    $scope.login_user.password = null;
    $scope.register_user.email = null;
    $scope.register_user.password = null;
    $scope.register_user.password_confirmation = null;
  };
}]);