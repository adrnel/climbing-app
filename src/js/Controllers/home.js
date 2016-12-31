angular.module('climbingApp')
    .controller("homeCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.isDropdown = false;
        $scope.clickMobileMenu = function(){
            $scope.isDropdown = !$scope.isDropdown
        }
    }])