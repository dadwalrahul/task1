

app.controller('AdminCtrl', function($scope, $http){
    
    $http.get("/rest/user")
    .success(function(users)
    {
        $scope.users = users;
    });
    
    $scope.remove = function(user)
    {
        $http.delete('/rest/user/'+user._id)
        .success(function(users){
           $scope.users = users; 
        });
    }
    
});

