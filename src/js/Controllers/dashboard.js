angular.module('climbing-app')
    .controller("dashboardCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.isDropdown = false;
        $scope.clickMobileMenu = function(){
            $scope.isDropdown = !$scope.isDropdown
        }
    }])