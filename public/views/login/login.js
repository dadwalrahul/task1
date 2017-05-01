

app.controller("LoginCtrl", function($scope, $http, $location, $rootScope){
    $scope.login = function(user){
        if(user=="" || user==undefined)
        {
            $rootScope.message = "Your are not a registered user";
            console.log("user",user);
        }
        else
        {
        $http.post("/login", user)
        .success(function(response){
            console.log("user",user);
            $rootScope.currentUser = response;
            $location.url("/profile");
        });
    	}
    }
});

