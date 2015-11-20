app.controller('Head', ['$scope', 'Scopes', function($scope, Scopes){
    Scopes.set('Head', $scope);

}]);

app.controller('Body', ['$scope','Scopes', function($scope, Scopes) {
  Scopes.set('Body', $scope);

}]);
