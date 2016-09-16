angular.module('app.projectsFactory', [])

.factory('Project', function($resource) {
  return $resource('/projects/:id.json', {}, {
    show:   { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
})

.factory('Projects', function($resource) {
  return $resource('/projects.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
});