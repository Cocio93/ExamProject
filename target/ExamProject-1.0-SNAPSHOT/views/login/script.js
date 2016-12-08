var app = angular.module('myApp.loginModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'views/login/Login.html',
            controller: 'loginController'
        });
    }]);

app.controller('loginController', ['loginService', '$scope', function (loginService, $scope) {
        $scope.userInfo = {userName: '', password: ''};
        $scope.allFieldsFilled = true;
        $scope.loggedIn = false;
        $scope.wrongInfo = false;


        $scope.login = function () {
            var userName = $scope.userInfo.userName;
            var password = $scope.userInfo.password;
            $scope.allFieldsFilled = true;
            $scope.loggedIn = false;
            $scope.wrongInfo = false;

            if (userName !== '' && password !== '') {
                var response = false;
                loginService.login($scope.userInfo)
                        .success(function (data) {
                            if (data.success === true) {
                                $scope.loggedIn = true;
                            } else {
                                $scope.wrongInfo = true;
                            }
                        });
            } else {
                $scope.allFieldsFilled = false;
            }
        };


    }]);

app.service("loginService", function ($http) {
    var url = '/ExamProject/api/user/login';

    return {
        login: function (user) {
            var json = JSON.stringify(user);
            return $http({
                url: url,
                method: 'post',
                data: json
            });
        }
    };
});