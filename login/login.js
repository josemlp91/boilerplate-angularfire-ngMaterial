
angular.module('app.login', [
  'ngRoute',
  'firebase',
  'app.services'
]).


config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  })
}]).


controller('LoginCtrl', ['$scope', 'Auth', '$location', '$rootScope', '$mdToast', function($scope, Auth, $location, $rootScope, $mdToast) {
  $scope.login = function() {

    $rootScope.authData = null
    $rootScope.error = null
    $scope.toastDisplayed = false;

    Auth.$authWithPassword({
      email: $scope.login.email,
      password: $scope.login.password
      }).then(function(authData) {
        $rootScope.authData = authData
        $location.path('/')
      }).catch(function(error) {
        $rootScope.error = error
      })

  }

$scope.showSimpleToast = ToastErrorLogin($scope, $mdToast);





}])


function ToastErrorLogin($scope, $mdToast){
  return function(){
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    }
  $scope.toastPosition = angular.extend({},last);
  $scope.getToastPosition = function() {
    sanitizePosition()
    return Object.keys($scope.toastPosition)
      .filter(function(pos) {
        return $scope.toastPosition[pos]
       })
      .join(' ')
  }
  function sanitizePosition() {
    var current = $scope.toastPosition
    if ( current.bottom && last.top ) current.top = false
    if ( current.top && last.bottom ) current.bottom = false
    if ( current.right && last.left ) current.left = false
    if ( current.left && last.right ) current.right = false
    last = angular.extend({},current)
  }


    var pinTo = $scope.getToastPosition();
    $mdToast.show(
      $mdToast.simple()
        .textContent('Email or password wrong.')
        .position(pinTo)
        .hideDelay(3000)
    )
    $scope.toastDisplayed = true;
  }
}
