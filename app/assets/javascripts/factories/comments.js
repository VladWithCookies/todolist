angular.module('app.commentsFactory', [])

.factory('Comments', function($resource) {
  return $resource('/comments.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
})

.factory('Comment', function($resource) {
  return $resource('/comments/:id.json', {}, {
    show:   { method: 'GET' },
    update: { method: 'PUT', params: {id: '@id'} },
    delete: { method: 'DELETE', params: {id: '@id'} }
  });
});