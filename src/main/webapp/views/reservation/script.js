var app = angular.module('myApp.reservationModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: 'views/reservation/Reservation.html'
        });
    }]);
app.controller('reservationCtrl', function ($scope, reservationService, $compile) {
    $scope.ticket = reservationService.getData();

    $scope.reserveeInfo = [{reserveeName: '', reserveePhone: '', reserveeEmail: ''}];

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
            inputFirst.name = "field";
            inputFirst.setAttribute("ng-model", "pass" + i + ".firstName");
//          inputFirst.setAttribute("ng-model", "passengers.firstName");
            container.appendChild(inputFirst);
            $compile(inputFirst)($scope);

            var inputLast = document.createElement("input");
            inputLast.type = "text";
            inputLast.placeholder = "Last Name";
            inputLast.name = "field";
            inputLast.setAttribute("ng-model", "pass" + i + ".lastName");
//            inputLast.setAttribute("ng-model", "passengers.lastName");
            container.appendChild(inputLast);
            $compile(inputLast)($scope);

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
    $scope.resRequest = function () {
        var allTbs = document.getElementsByName("field");
        for (var i = 0; i < allTbs.length; i++) {
            if (allTbs[i].value === "") {
                alert("Please fill out all the information\n\n");
                return false;
            }
        }
        $scope.passengers = [];
        for (var i = 0; i < $scope.ticket.numberOfSeats; i++) {
            var iString = "pass" + i.toString();
            $scope.passengers.push(
                    $scope[iString]
                    );
        }


        var data = {
            flightID: $scope.ticket.FlightID,
            numberOfSeats: $scope.ticket.numberOfSeats,
            reserveeName: $scope.reserveeInfo.reserveeName,
            reservePhone: $scope.reserveeInfo.reserveePhone,
            reserveeEmail: $scope.reserveeInfo.reserveeEmail,
            passengers: $scope.passengers,
            baseUrl: $scope.ticket.baseUrl
        };

        console.log(data);
//        $.ajax({
//            type: "POST",
//            url: "ExamProject/api/reservation",
//            processData: false,
//            contentType: 'application/json',
//            data: JSON.stringify(data)
//        });
    };
});