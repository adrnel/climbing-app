angular.module('climbing-app', [])
    .controller("loginCtrl", ["$scope", function ($scope) {
        $scope.isLogin = true;
        $scope.isSignup = false;
        $scope.clickLoginTab = function(){
            $scope.isLogin = true;
            $scope.isSignup = false;
        }
        $scope.clickSignupTab = function(){
            $scope.isLogin = false;
            $scope.isSignup = true;
        }
    }]);