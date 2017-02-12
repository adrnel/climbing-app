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
        .when('/scores', {
            templateUrl : 'templates/scores.html',
            controller  : 'scoresCtrl'
        })

        // route for the contact page
        .when('/graphs', {
            templateUrl : 'templates/graphs.html',
            controller  : 'graphsCtrl'
        });
});