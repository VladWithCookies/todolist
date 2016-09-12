/*
= require angular
= require angular-ui-router 
= require angular-rails-templates
= require angular-animate
= require angular-aria
= require angular-resource
= require angular-material
= require controllers/projectListCtrl
= require_tree .
*/
var app = angular.module('app',  ['ngAria', 'ngMaterial', 'ngAnimate', 'ui.router', 'templates', 'ngResource']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('list', {
      url: '/',
      templateUrl: 'projects/index.html',
      controller: 'ProjectListCtrl',
    })
    .state('new_project', {
      url: '/projects/new',
      templateUrl: 'projects/new.html',
      controller: 'ProjectAddCtrl'
    })
    .state('edit_project', {
      url: '/projects/:id/edit', 
      templateUrl: 'projects/edit.html',
      controller: 'ProjectUpdateCtrl'
    })
    .state('show_task', {
      url: '/tasks/:id',
      templateUrl: 'tasks/show.html',
      controller: 'TaskCtrl'
    })
    .state('edit_task', {
      url: '/tasks/:id/edit',
      templateUrl: 'tasks/edit.html',
      controller: 'TaskCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
      controller: 'AuthCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'register/register.html',
      controller: 'AuthCtrl'
    })

  $urlRouterProvider.otherwise('/');
}); 

app.factory('Project', function($resource) {
  return $resource('/projects/:id.json', {}, {
    show:   { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
});

app.factory('Projects', function($resource) {
  return $resource('/projects.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
});

app.factory('Tasks', function($resource) {
  return $resource('/tasks.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
});

app.factory('Task', function($resource) {
  return $resource('/tasks/:id/:action.json', {}, {
    show:   { method: 'GET' },
    update: { method: 'PUT',    params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} },
    mark:   { method: 'POST',   params: {id: '@id', action: 'mark' } },
    deadline: { method: 'POST', params: {id: '@id', action: 'deadline'} },
    priority_up: { method: 'POST', params: {id: '@id', action: 'priority_up'} },
    priority_down: { method: 'POST', params: {id: '@id', action: 'priority_down'} }
  });
});

app.factory('Comments', function($resource) {
  return $resource('/comments.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
});

app.factory('Comment', function($resource) {
  return $resource('/comments/:id.json', {}, {
    show:   { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
});

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.transformResponse.push(function(responseData){
        convertDateStringsToDates(responseData);
        return responseData;
    });
}]);

app.controller('AuthCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.login_user = { email: null, password: null };
  $scope.register_user = {email: null, password: null, password_confirmation: null};

  $scope.login = function() {
    $http.post('../users/sign_in.json', {user: {email: $scope.login_user.email, password: $scope.login_user.password}});
  };

  $scope.logout = function() {
    $http({method: 'DELETE', url: '../users/sign_out.json', data: {}});
  };

  $scope.register = function() {
    $http({ 
      method: 'POST', 
      url: '../users.json',
      data: {
        user: {
          email: $scope.register_user.email,
          password: $scope.register_user.password,
          password_confirmation: $scope.register_user.password_confirmation
        }
      }                 
    });
  }
}]);

app.controller('ProjectAddCtrl', ['$scope', 'Projects', '$location', '$resource', function($scope, Projects, $location, $resource) {
  $scope.project = {}
    
  $scope.save = function() {
    Projects.create({ project: $scope.project }, function() {
      $location.path('/');
    });
  }
}]);

app.controller('ProjectListCtrl', ['$scope', '$http', '$resource', '$location', 'Projects', 'Project', 'Tasks', 'Task', function($scope, $http, $resource, $location, Projects, Project, Tasks, Task) {
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

app.controller('ProjectUpdateCtrl', ['$scope', 'Project', '$location', '$resource', '$stateParams', function($scope, Project, $location, $resource, $stateParams) {
  $scope.project = Project.get({ id: $stateParams.id })

  $scope.update = function() {
    Project.update({ id: $scope.project.id, project: $scope.project }, function() {
      $location.path('/')
    })
  }
}]);

app.controller('TaskCtrl', ['$scope', '$http', '$resource', '$location', 'Task', '$stateParams', 'Comments', 'Comment', function($scope, $http, $resource, $location, Task, $stateParams, Comments, Comment) {
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

var regexIso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

function convertDateStringsToDates(input) {
  if (typeof input !== "object") return input;
  
  for (var key in input) {
    if (!input.hasOwnProperty(key)) continue;
    var value = input[key];
    var match;
        
    if (typeof value === "string" && (match = value.match(regexIso8601))) {  
      var milliseconds = Date.parse(match[0]);
        
      if (!isNaN(milliseconds)) {
        input[key] = new Date(milliseconds);
      }

    } else if (typeof value === "object") {
      convertDateStringsToDates(value);
    }
  }
}