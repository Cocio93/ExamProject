var app = angular.module('myApp.reservationModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: 'views/reservation/Reservation.html'
        });
    }]);
app.controller('reservationCtrl', function ($scope, reservationService) {
    $scope.ticket = reservationService.getData();
    $scope.airports = [
        {code: 'CPH', name: 'Copenhagen'},
        {code: 'STN', name: 'London'},
        {code: 'BCN', name: 'Barcelona'},
        {code: 'CDG', name: 'Paris'},
        {code: 'SXF', name: 'Berlin'}];

    $scope.iATAToName = function (code) {
        var name = '';
        var codeName = '';
        for (var i = 0; i < $scope.airports.length; i++) {
            if ($scope.airports[i].code === code) {
                name = $scope.airports[i].name;
                codeName = $scope.airports[i].code;
            }
        }
        var res = name + "(" + codeName + ")";
        return res;
    };
});