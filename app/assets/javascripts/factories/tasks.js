angular.module('app.tasksFactory', [])

.factory('Tasks', function($resource) {
  return $resource('/tasks.json', {}, {
    query:  { method: 'GET', isArray: true },
    create: { method: 'POST' }
  });
})

.factory('Task', function($resource) {
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
