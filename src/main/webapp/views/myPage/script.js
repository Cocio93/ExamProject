/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var app = angular.module('myApp.userModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/myPage', {
            templateUrl: 'views/myPage/MyPage.html',
            controller: 'userController'
        });
    }]);

app.controller("userController", function($scope){
    $scope.isLoggedIn = false;
    
});


app.service('userService', function () {
    var loggedIn;
    return {
        setLoggedIn: function (s) {
            console.log("SetLoggedIn: " + s);
            loggedIn = s;
        },
        IsLoggedIn: function () {
            return loggedIn;
        }
    };
});
