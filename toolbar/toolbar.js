angular.module('app.toolbar', [
  'app.services'
]).


controller('ToolbarCtrl', ['Auth', '$scope', function(Auth, $scope){
  $scope.auth = Auth
  Auth.$onAuth(function(authData){
    $scope.authData = authData;
  })
}])
