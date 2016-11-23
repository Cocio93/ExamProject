var app = angular.module('myApp.loginModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/Login.html'
        });
    }]);