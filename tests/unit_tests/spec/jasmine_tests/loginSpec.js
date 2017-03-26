describe("Login Page", function() {
    beforeEach(angular.mock.module('climbingApp'));
    
    var $controller;
    
    beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));
    
	describe('Login', function () {
		it('Clicking the login tab should set login to true', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
            $scope.clickLoginTab();
			expect($scope.isLogin).toBe(true);
			expect($scope.isSignup).toBe(false);
		});	
        it('Clicking the signup tab should set login to false', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
            $scope.clickSignupTab();
			expect($scope.isLogin).toBe(false);
			expect($scope.isSignup).toBe(true);
		});	
	});

});
