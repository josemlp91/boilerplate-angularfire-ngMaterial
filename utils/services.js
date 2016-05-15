angular.module('app.services', [
  'app.constants'
]).

factory('Auth', ['$firebaseAuth','FirebaseUrl',
  function($firebaseAuth, FirebaseUrl) {
    var ref = new Firebase(FirebaseUrl)
    return $firebaseAuth(ref)
  }
])
