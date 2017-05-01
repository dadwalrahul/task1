

app.controller('UpdateCtrl', function($scope, $http){
    
    $http.get("/rest/user")
    .success(function(users)
    {
        $scope.users = users;
    });
    
   
    
    $scope.update = function(user)
    {
        $http.put('/rest/user/'+user._id, user)
        .success(function(users){
            $scope.users = users; 
        });
    }
    
});

