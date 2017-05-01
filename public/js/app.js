
var app = angular.module("PassportApp", ["ngRoute",'RegisterCtrl' ,'ngFileUpload']);

app.config(function($routeProvider, $httpProvider) {
    $routeProvider
      .when('/main', {
          templateUrl: 'views/home/main.html'
      })
      .when('/profile', {
          templateUrl: 'views/profile/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
              loggedin: checkLoggedin
          }
      })
      .when('/login', {
          templateUrl: 'views/login/login.html',
          controller: 'LoginCtrl'
      })
      .when('/register', {
          templateUrl: 'views/register/register.html',
          controller: 'RegisterCtrl'
      })
      .when('/update', {
          templateUrl: 'views/update/update.html',
          controller: 'UpdateCtrl'
      })
      .when('/admin', {
          templateUrl: 'views/admin/admin.html',
          controller: 'AdminCtrl'
      })
      .otherwise({
          redirectTo: '/main'
      });
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope , Upload)
{
    var deferred = $q.defer();

    $http.get('/loggedin').success(function(user)
    {
        $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0')
        {
            $rootScope.currentUser = user;
            deferred.resolve();
        }
        // User is Not Authenticated
        else
        {
            $rootScope.errorMessage = 'You need to log in.';
            deferred.reject();
            $location.url('/login');
        }
    });

     $rootScope.setImage = function (file, errFiles) {
      console.log ('inside upload');

        if (file) {
            $rootScope.file = file;
            
            console.log ($rootScope.file);
            var url ='/uploadimage';
            // process saving file
            Upload.upload ({
                url: url,
                method: 'POST',
                data: {image: file}
            }). then (function (d){
                console.log (d.data.message);
            }, function (d) {
                if (d.status == 500)
                    console.error ('server error');
                else  console.error (JSON.stringify(d));
            });
        }
        else
        {
          console.log("FILE NOT FOUND");
        }
    }
    
    return deferred.promise;
};

