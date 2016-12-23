angular.module('climbing-app')
    .controller("loginCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.isLogin = true;
        $scope.isSignup = false;
        $scope.loginError = false;
        $scope.username;
        $scope.password;
        $scope.confirmPassword;
        $scope.form={
           email:''
        };
        //$scope.email;
        $scope.loginForm;

        $scope.clickLoginTab = function(){
            $scope.isLogin = true;
            $scope.isSignup = false;
        }
        $scope.clickSignupTab = function(){
            $scope.isLogin = false;
            $scope.isSignup = true;
        }
        $scope.loginSubmit = function(){
            if($scope.isLogin){
                $scope.loginError = false;
                var loginForm = {
                    username : $scope.username,
                    password : $scope.password
                };
                console.log("Loggin clicked");
                console.log("$scope.username: ",$scope.username);

                $http.put("./api/login/", loginForm)
                    .then(function(response) {
                        console.log("successful login, here's the user:", response.data);
                        window.location.href = "./dashboard.html";
                    }, function(response){
                        $scope.loginError = true;
                        console.log("Failure");
                    });
            } else if($scope.isSignup){
                $scope.signupError = false;
                var signupForm = {
                    email : $scope.form.email,
                    username : $scope.username,
                    password : $scope.password
                };
                console.log("Signup clicked");
                $http.post("./api/signup/", signupForm)
                    .then(function(response) {
                        console.log("successful sugnup, here's the user:", response.data);
                        window.location.href = "./dashboard.html";
                    }, function(response){
                        $scope.signupError = true;
                        console.log("Failure");
                    });

            }




        }
    }]);