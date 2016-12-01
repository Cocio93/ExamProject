var app = angular.module('myApp.reservationModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: 'views/reservation/Reservation.html'
        });
    }]);
app.controller('reservationCtrl', function ($scope, reservationService) {
    $scope.ticket = reservationService.getData();
//    $scope.resultSet = function () {
//        $scope.ticket = reservationService.getData;
//    };

    console.log($scope.ticket);
});