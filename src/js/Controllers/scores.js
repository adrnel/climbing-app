angular.module('climbingApp')
    .controller("scoresCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.scores={
            spotty:0,
            black:0,
            tiger:0,
            blue:0,
            salmon:0,
            yellow:0,
            purpleYellow:0,
            hendrix:0,
            red:0,
            white:0,
            green:0,
            scores:0
        }
        $scope.onlyNumbers = /^\d+$/;

        $scope.addOne = function(colourIndex){
            $scope.scores[Object.keys($scope.scores)[colourIndex]]++;
        }
        $scope.minusOne = function(colourIndex){
            if($scope.scores[Object.keys($scope.scores)[colourIndex]] >= 1){
                $scope.scores[Object.keys($scope.scores)[colourIndex]]--;
            }
        }
        $scope.onlyNumbers = function(colourIndex){
            $scope.scores[Object.keys($scope.scores)[colourIndex]] = String($scope.scores[Object.keys($scope.scores)[colourIndex]]).replace(/\D/g,'');
        }
        $scope.onlyNumbers = function(colourIndex){
            $scope.scores[Object.keys($scope.scores)[colourIndex]] = String($scope.scores[Object.keys($scope.scores)[colourIndex]]).replace(/\D/g,'');
        }
    }])