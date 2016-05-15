angular.module('app', [
  'ngRoute',
  'ngMaterial',
  'app.register',
  'app.login',
  'app.home',
  'app.toolbar'
]).


config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'})
}])
