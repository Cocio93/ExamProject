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
    $scope.minutesToHours = function (time) {
        var hours = Math.trunc(time / 60);
        var minutes = time % 60;
        var hourString = "Hour";
        if (hours > 1) {
            hourString = "Hours";
        }
        if (minutes === 0) {
            return hours + " " + hourString;
        } else {
            return hours + " " + hourString + " and " + minutes + " Min";
        }
    };

});