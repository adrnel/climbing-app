angular.module('climbingApp')
    .controller("graphsCtrl", ["$scope", "$location", "$http", function ($scope, $location, $http) {
        $scope.getScores = function(){
            $http.get("./api/archscores?userId="+$scope.userId)
                .then(function(response) {
                    console.log("Score retrieved successfully, here's the result:", response.data);
                    window.alert("You score has been posted successfully");
                }, function(response){
                    console.log("Failure");
                });
        };
    }]);