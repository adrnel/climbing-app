describe("Scores Page", function() {
    beforeEach(angular.mock.module('climbingApp'));{
        var $controller;
        var $scope = {};
    }
    beforeEach(angular.mock.inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('Scores', function () {
        it('Calling the addOne function should increase the selected score by one', function () {
            var controller = $controller('scoresCtrl', { $scope: $scope });
            $scope.scores={
                spotty:0,
                black:4,
                tiger:3
            };
            $scope.addOne(1);
            expect($scope.scores.black).toBe(5);
        });
        it('Calling the minusOne function should decrease the selected score by one', function () {
            var controller = $controller('scoresCtrl', { $scope: $scope });
            $scope.scores={
                spotty:0,
                black:4,
                tiger:3
            };
            $scope.minusOne(2);
            expect($scope.scores.tiger).toBe(2);
        });
        it('Calling the onlyNumbers function should remove all non number characters', function () {
            var controller = $controller('scoresCtrl', { $scope: $scope });
            $scope.scores={
                spotty:0,
                black:4,
                tiger:'This is a String'
            };
            $scope.onlyNumbers(2);
            expect($scope.scores.tiger).toBe('');
        });
        it('Calling the onlyNumbers function should not remove a character if it is a number', function () {
            var controller = $controller('scoresCtrl', { $scope: $scope });
            $scope.scores={
                spotty:0,
                black:4,
                tiger:3
            };
            $scope.onlyNumbers(2);
            expect($scope.scores.tiger).toBe('3');
        });
        it('Calling the calculateScore function should calculate the correct score', function () {
            var controller = $controller('scoresCtrl', { $scope: $scope });
            $scope.scores={
                spotty:1,
                black:2,
                tiger:5,
                blue:4,
                salmon:6,
                yellow:4,
                yurple:2,
                hendrix:1,
                red:0,
                white:0,
                green:0,
                totalScore:0
            };
            $scope.calculateScore();
            expect($scope.scores.totalScore).toBe(260);
        });
    });
});