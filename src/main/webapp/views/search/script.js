var app = angular.module('myApp.searchModule', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'views/search/SearchPage.html',
            controller: 'searchCtrl'
        });
    }]);

app.controller('searchCtrl', ['TicketFactory', '$scope', 'reservationService', function (TicketFactory, $scope, reservationService) {
        $scope.airports = [{code: 'CPH', name: 'Copenhagen'}, {code: 'STN', name: 'London'}, {code: 'BCN', name: 'Barcelona'}, {code: 'CDG', name: 'Paris'}, {code: 'SXF', name: 'Berlin'}];
        $scope.searchParams = {from: '', to: '', date: '', tickets: 1, flexdate: ''};
        $scope.searchResults = [];
        $scope.isSearched = false;
        $scope.flextoggle = false;
        $scope.errorOccured = false;
        $scope.fixedDestination = false;
        $scope.noFlights = false;

        $scope.getSearchResults = function () {
            if ($scope.inputErrors() === true) {
                return;
            }

            var tickets = $scope.searchParams.tickets;
            var to = $scope.searchParams.to;
            var from = $scope.searchParams.from;
            var date = new Date();
            date.setTime($scope.searchParams.date);
            date.setDate(date.getDate() + 1);
            var flexDate = new Date();
            flexDate.setTime($scope.searchParams.flexdate);
            flexDate.setDate(flexDate.getDate() + 1);
            
            
            //Saving data to the service
            $scope.reservationSetData = function (flight) {
                reservationService.setData(flight);
            };

            if ($scope.flextoggle === true) {
                if ($scope.fixedDestination === false) {
                    $scope.searchResults = TicketFactory.getFromTicketsFlex(from, date, flexDate, tickets)
                            .success(function (data) {
                                $scope.searchResults = data;
                            })
                            .error(function (error) {
                                return;
                            });
                } else if ($scope.fixedDestination === true) {
                    $scope.searchResults = TicketFactory.getFromToTicketsFlex(from, to, date, flexDate, tickets)
                            .success((function (data) {
                                $scope.searchResults = data;
                            }))
                            .error(function (error) {
                                return;
                            });
                }

            } else if ($scope.flextoggle === false) {
                if ($scope.fixedDestination === false) {
                    $scope.searchResults = TicketFactory.getFromTickets(from, date, tickets)
                            .success(function (data) {
                                $scope.searchResults = data;
                            })
                            .error(function (error) {
                                $scope.isSearched = false;
                                $scope.noFlights = true;
                                return;
                            });
                } else if ($scope.fixedDestination === true) {
                    $scope.searchResults = TicketFactory.getFromToTickets(from, to, date, tickets)
                            .success((function (data) {
                                $scope.searchResults = data;

                            }))
                            .error(function (error) {
                                $scope.isSearched = false;
                                $scope.noFlights = true;
                                return;
                            });
                }
            }

            $scope.setNoFlights($scope.searchResults);
        };

        $scope.inputErrors = function () {
            if ($scope.searchParams.date === "" ||
                    $scope.searchParams.from === "" ||
                    ($scope.flextoggle === true && $scope.searchParams.flexdate === "") ||
                    ($scope.fixedDestination === true && $scope.searchParams.from === $scope.searchParams.to) ||
                    ($scope.fixedDestination === true && $scope.searchParams.to === ""))

            {
                $scope.isSearched = false;
                $scope.errorOccured = true;
                return true;
            } else {
                $scope.errorOccured = false;
                $scope.isSearched = true;
                return false;
            }
        };

        $scope.setNoFlights = function (arr) {
            if (arr.length === 0) {
                $scope.isSearched = false;
                $scope.noFlights = true;
            } else {
                $scope.noFlights = false;
                $scope.isSearched = true;
            }
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
    }]);

app.factory('TicketFactory', function ($http) {
    var baseUrl = '/ExamProject/api/flights';
    return {
        getFromTickets: function (from, date, tickets) {
            return $http({
                url: baseUrl + '/' + from + '/' + date.toISOString() + '/' + tickets,
                method: 'get'
            });
        },
        getFromToTickets: function (from, to, date, tickets) {
            return $http({
                url: baseUrl + '/' + from + '/' + to + "/" + date.toISOString() + '/' + tickets,
                method: 'get'
            });
        },
        getFromTicketsFlex: function (from, fromDate, toDate, tickets) {
            return $http({
                url: baseUrl + '/flex/' + from + '/' + fromDate.toISOString() + "/" + toDate.toISOString() + '/' + tickets,
                method: 'get'
            });
        },
        getFromToTicketsFlex: function (from, to, fromDate, toDate, tickets) {
            return $http({
                url: baseUrl + '/flex/' + from + "/" + to + '/' + fromDate.toISOString() + "/" + toDate.toISOString() + '/' + tickets,
                method: 'get'
            });
        }
    };
});

app.service('reservationService', function () {
    var data;
    return {
        setData: function (flight) {
            data = flight;
        },
        getData: function () {
            return data;
        }
    };
});