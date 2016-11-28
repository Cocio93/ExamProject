var app = angular.module('myApp.searchModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'views/search/SearchPage.html',
            controller: 'searchCtrl'
        });
    }]);

app.controller('searchCtrl', ['TicketFactory', '$scope', function (TicketFactory, $scope) {
        $scope.airports = [{code: 'CPH', name: 'Copenhagen'}, {code: 'STN', name: 'London'}, {code: 'BCN', name: 'Barcelona'}, {code: 'CDG', name: 'Paris'}, {code: 'SXF', name: 'Berlin'}];
        $scope.searchParams = {from: '', to: '', date: '', tickets: 1, flexdate: ''};
        $scope.searchResults = [];
        $scope.isSearched = false;
        $scope.flextoggle = false;
        $scope.errorOccured = false;

        $scope.getSearchResults = function () {
            $scope.searchResults = [];
            if ($scope.searchParams.date === "" || $scope.searchParams.from === "" || ($scope.flextoggle === true && $scope.searchParams.flexdate === "")) {
                $scope.isSearched = false;
                $scope.errorOccured = true;
                return;
            } else {
                $scope.errorOccured = false;
                $scope.isSearched = true;
            }

            var tickets = $scope.searchParams.tickets;
            var to = $scope.searchParams.to;
            var from = $scope.searchParams.from;
            var date = $scope.searchParams.date;
            var flexdate = $scope.searchParams.flexdate;
            date.setDate(date.getDate() + 1);

            if ($scope.flextoggle === true) {
                var arr = [];
                while (date <= flexdate) {
                    $scope.searchResults = TicketFactory.getFromTickets(from, date, tickets)
                            .success((function (data) {
                                arr.push(data);
                            }
                            ));
                    $scope.searchResults = arr;
                    date.setDate(date.getDate() + 1);
                }
            } else {
                $scope.searchResults = TicketFactory.getFromTickets(from, date, tickets)
                        .success(function (data) {
                            var arr = [];
                            arr.push(data);
                            $scope.searchResults = arr;
                        });
            }
            date.setDate(date.getDate() - 1);
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
                return hours + " " + hourString + " and " + minutes + " Minutes";
            }
        };

        $scope.iATAToName = function (code) {
            var name = '';
            for (var i = 0; i < $scope.airports.length; i++) {
                if ($scope.airports[i].code === code) {
                    name = $scope.airports[i].name;
                }
            }
            return name;
        };
    }]);

app.factory('TicketFactory', function ($http) {
    var baseUrl = 'http://airline-plaul.rhcloud.com/api/flightinfo';
    return {
        getFromTickets: function (from, date, tickets) {
            return $http({
                url: baseUrl + '/' + from + '/' + date.toISOString() + '/' + tickets,
                method: 'get'
            });
        }
    };
});