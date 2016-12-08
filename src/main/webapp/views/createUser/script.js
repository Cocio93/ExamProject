var app = angular.module('myApp.signupModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/signup', {
            templateUrl: 'views/createUser/CreateUser.html',
            controller: "signUpController"
        });
    }]);

app.controller("signUpController", ['$scope', 'signUpService', function ($scope, signUpService) {
        $scope.user = {firstName: '', lastName: '', userName: '', password: '', rePassword: ''};
        $scope.passwordsMatch = true;
        $scope.allFieldsFilled = true;
        $scope.createSuccess = false;
        $scope.userExists = false;

        $scope.createUser = function () {
            var firstName = $scope.user.firstName;
            var lastName = $scope.user.lastName;
            var userName = $scope.user.userName;
            var password = $scope.user.password;
            var rePassword = $scope.user.rePassword;
            $scope.passwordsMatch = true;
            $scope.allFieldsFilled = true;
            $scope.createSuccess = false;
            $scope.userExists = false;

            if (firstName !== '' && lastName !== '' && userName !== '' && password !== '' && rePassword !== '') {
                $scope.allFieldsFilled = true;
                if (password === rePassword) {
                    $scope.passwordsMatch = true;
                    var user = {firstName: firstName, lastName: lastName, userName: userName, password: password};
                    signUpService.createUser(user)
                            .success(function (response) {
                                $scope.resetFields();
                                $scope.createSuccess = true;
                            })
                            .error(function (error) {
                                $scope.userExists = true;
                            });

                } else {
                    $scope.passwordsMatch = false;
                }
            } else {
                $scope.allFieldsFilled = false;
            }
        };

        $scope.resetFields = function () {
            $scope.user = {firstName: '', lastName: '', userName: '', password: '', rePassword: ''};
        };

    }]);

app.service("signUpService", function ($http) {
    var url = '/ExamProject/api/user/signup';

    return {
        createUser: function (user) {
            var json = JSON.stringify(user);
            return $http({
                url: url,
                method: 'post',
                data: json
            });
        }
    };
});