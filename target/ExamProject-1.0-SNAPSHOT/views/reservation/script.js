var app = angular.module('myApp.reservationModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/reservation', {
            templateUrl: 'views/reservation/Reservation.html',
            controller: 'reservationCtrl'
        });
    }]);
app.controller('reservationCtrl', ['$scope', 'reservationService', '$compile', 'resService', function ($scope, reservationService, $compile, resService) {
        $scope.ticket = reservationService.getData();
        $scope.reservationRequest = {flightID: '', numberOfSeats: '', 
            reserveeName: '', reservePhone: '', reserveeEmail: '', passengers: '', baseUrl: ''};
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
            console.log("Making Reservation Request");
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

            $scope.reservationRequest.flightID = $scope.ticket.flightID;
            $scope.reservationRequest.numberOfSeats = $scope.ticket.numberOfSeats;
            $scope.reservationRequest.passengers = $scope.passengers;
            $scope.reservationRequest.reservePhone = $scope.reserveeInfo.reserveePhone;
            $scope.reservationRequest.reserveeEmail = $scope.reserveeInfo.reserveeEmail;
            $scope.reservationRequest.reserveeName = $scope.reserveeInfo.reserveeName;
            $scope.reservationRequest.baseUrl = $scope.ticket.baseUrl;           
            
            resService.submit($scope.reservationRequest)
                    .success(function (data) {
                        console.log(data);
                        if (data.success === true) {
                            console.log("yay");
                        } else {
                            console.log("nay");
                        }
                    });
        };
    }]);
app.service('resService', function ($http) {

    return {
        submit: function (data) {
            var url = '/ExamProject/api/reservation';
            var json = JSON.stringify(data);
            console.log(json);
            return $http({
                url: url,
                method: 'post',
                data: json
            });
        }
    };
});
