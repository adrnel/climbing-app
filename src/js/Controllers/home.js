angular.module('climbingApp')
    .controller("homeCtrl", ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {
        $scope.isDropdown = false;
        $scope.clickMobileMenu = function(){
            $scope.isDropdown = !$scope.isDropdown;
        };
        $scope.clickOffMobileMenu = function(){
            $scope.isDropdown = false;
        };
        $scope.location = $location.path();
        $rootScope.$on('$routeChangeSuccess', function() {
            $scope.location = $location.path();
        });
    }]);