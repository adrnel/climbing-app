angular.module('climbingApp', ['ngRoute']).config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'templates/dashboard.html',
            controller  : 'dashboardCtrl'
        })

        .when('/dashboard', {
            templateUrl : 'templates/dashboard.html',
            controller  : 'dashboardCtrl'
        })

        // route for the about page
        .when('/scored', {
            templateUrl : 'pages/scores.html',
            controller  : 'scoresController'
        })

        // route for the contact page
        .when('/contact', {
            templateUrl : 'pages/contact.html',
            controller  : 'contactController'
        });
});