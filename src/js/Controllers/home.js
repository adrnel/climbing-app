angular.module('climbingApp')
    .controller("homeCtrl", ["$scope", "$location", "$rootScope", "$http", function ($scope, $location, $rootScope, $http) {
        $scope.isDropdown = false;
        $scope.clickMobileMenu = function(){
            $scope.isDropdown = !$scope.isDropdown;
        };
        $scope.clickOffMobileMenu = function(){
            $scope.isDropdown = false;
        };
        $scope.logout = function(){
            console.log('logout');
            $http.post("./api/logout")
                .then(function (response) {
                    console.log("Logout Successful");
                }, function (response) {
                    console.log("Failed to logout");
                });
            window.location = '/';
        };
        $scope.location = $location.path();
        $rootScope.$on('$routeChangeSuccess', function() {
            $scope.location = $location.path();
        });
    }]);