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

    $scope.addFields = function () {
        var seatNum = $scope.ticket.numberOfSeats;
        var container = document.getElementById("container");
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        for (i = 0; i < seatNum; i++) {
            container.appendChild(document.createTextNode("Passenger " + (i + 1)));
            var inputFirst = document.createElement("input");
            inputFirst.type = "text";
            inputFirst.placeholder = "First Name";
            inputFirst.name = "first";
            container.appendChild(inputFirst);

            var inputLast = document.createElement("input");
            inputLast.type = "text";
            inputLast.placeholder = "Last Name";
            inputLast.name = "last";
            container.appendChild(inputLast);
            //container.appendChild(document.createElement("br"));
        }
        ;
    };

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