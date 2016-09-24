/*
= require jquery
= require bootstrap-sprockets
= require angular
= require angular-ui-router 
= require angular-rails-templates
= require angular-animate
= require angular-aria
= require angular-resource
= require angular-material
= require angularjs-file-upload
= require_tree .
*/
var app = angular.module('app', [
  'app.task',
  'app.projectUpdate', 
  'app.projectAdd', 
  'app.projectList', 
  'app.auth', 
  'app.comment',
  'app.projectsFactory',
  'app.tasksFactory',
  'app.commentsFactory',
  'app.usersFactory',

  'app.flashFactory',

  'ngAria', 
  'ngMaterial', 
  'ngAnimate', 
  'ngResource',
  'ui.router', 
  'templates',
  'angularFileUpload',

]);

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
    .state('add_file', {
      url: '/comments/:id',
      templateUrl: 'comments/add_file.html',
      controller: 'CommentCtrl'
    });

  $urlRouterProvider.otherwise('/');
}); 

app.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.defaults.transformResponse.push(function(responseData){
    convertDateStringsToDates(responseData);
    return responseData;
  });
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