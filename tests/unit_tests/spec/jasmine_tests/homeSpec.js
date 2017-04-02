describe("Home Page", function() {
    beforeEach(angular.mock.module('climbingApp'));{
        var $controller;
    }
    beforeEach(angular.mock.inject(function(_$controller_){
        $controller = _$controller_;
	}));
    	describe('home', function () {
		it('Cslling the mobile menu function should set isDropdown to the opposite of what is currently is', function () {
			var $scope = {};
			var controller = $controller('homeCtrl', { $scope: $scope });
            var startingState = $scope.isDropdown;
            $scope.clickMobileMenu();
			expect($scope.isDropdown).toBe(!startingState);
		});
	});

});
