angular.module('app.usersFactory', [])

.factory('Users', function($resource) {
  return $resource('/users/get_current_user', {}, {
    get_current_user: { method: 'POST' }
  });
});
