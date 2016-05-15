
angular.module('app.register', [
  'ngRoute',
  'firebase',
  'app.services'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/register', {
    templateUrl: 'register/register.html',
    controller: 'RegisterCtrl'
  })
}])

.controller('RegisterCtrl', ['Auth', '$scope', '$rootScope', '$location', '$mdToast', function(Auth, $scope, $rootScope, $location, $mdToast) {
  $scope.register = function() {
        $scope.message = null
        $scope.error = null

        Auth.$createUser({
          email: $scope.register.email,
          password: $scope.register.password
        }).then(function(userData) {
          ToastRegister($scope, $mdToast, 'Account was successfully created.')
          $scope.message = "User created with uid: " + userData.uid
          $location.path('/login')
        }).catch(function(error) {
          $scope.error = error
          ToastRegister($scope, $mdToast, 'Email already exists.')

        })
      }

}])



function ToastRegister($scope, $mdToast, message){
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
        .textContent(message)
        .position(pinTo)
        .hideDelay(3000)
    )
}
