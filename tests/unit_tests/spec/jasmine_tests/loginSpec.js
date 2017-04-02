describe("Login Page", function() {
    beforeEach(angular.mock.module('climbingApp'));{
        var $controller;
    }
    beforeEach(angular.mock.inject(function(_$controller_){
        $controller = _$controller_;
	}));
    
	describe('Login', function () {
		it('Calling the login function should set isLogin to true', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
            $scope.clickLoginTab();
			expect($scope.isLogin).toBe(true);
			expect($scope.isSignup).toBe(false);
		});	
        it('Calling the signup function should set isSignup to true', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
            $scope.clickSignupTab();
			expect($scope.isLogin).toBe(false);
			expect($scope.isSignup).toBe(true);
		});	
	});
});
