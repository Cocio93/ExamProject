var app = angular.module('myApp.signupModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/createUser/CreateUser.html',
            controller: 'reservationCtrl'
        });
    }]);