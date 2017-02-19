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
            totalScore:0
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
        $scope.calculateScore = function(){
            $scope.scores.totalScore = $scope.scores.spotty * 1 +
            $scope.scores.black * 3 + $scope.scores.tiger * 6 +
            $scope.scores.blue * 10 + $scope.scores.salmon * 10 +
            $scope.scores.yellow * 15 + $scope.scores.purpleYellow * 21 +
            $scope.scores.hendrix * 21 + $scope.scores.red * 28 +
            $scope.scores.white * 36 + $scope.scores.green * 45;
        }
    }])