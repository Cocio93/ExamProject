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
        $scope.fixedDestination = false;
        $scope.noFlights = false;

        $scope.getSearchResults = function () {
            $scope.searchResults = [];
            if ($scope.inputErrors() === true) {
                return;
            }

            var tickets = $scope.searchParams.tickets;
            var to = $scope.searchParams.to;
            var from = $scope.searchParams.from;
            var date = new Date();
            date.setTime($scope.searchParams.date);
            date.setDate(date.getDate() + 1);
            var flexdate = new Date();
            flexdate.setTime($scope.searchParams.flexdate);
            flexdate.setDate(flexdate.getDate() + 1);

            if ($scope.flextoggle === true) {
                var arr = [];
                while (date <= flexdate) {
                    if ($scope.fixedDestination === false) {
                        $scope.searchResults = TicketFactory.getFromTickets(from, date, tickets)
                                .success((function (data) {
                                    arr.push(data);
                                }
                                ))
                                .error(function () {
                                    $scope.setNoFlights(arr);
                                    return;
                                });
                    } else if ($scope.fixedDestination === true) {
                        $scope.searchResults = TicketFactory.getFromToTickets(from, to, date, tickets)
                                .success((function (data) {
                                    arr.push(data);
                                }))
                                .error(function () {
                                    $scope.setNoFlights(arr);
                                    return;
                                });
                    }
                    date.setDate(date.getDate() + 1);
                }
            } else if ($scope.flextoggle === false) {
                if ($scope.fixedDestination === false) {
                    $scope.searchResults = TicketFactory.getFromTickets(from, date, tickets)
                            .success(function (data) {
                                var arr = [];
                                arr.push(data);
                                $scope.searchResults = arr;
                            })
                            .error(function () {
                                $scope.isSearched = false;
                                $scope.noFlights = true;
                                return;
                            });
                } else if ($scope.fixedDestination === true) {
                    $scope.searchResults = TicketFactory.getFromToTickets(from, to, date, tickets)
                            .success((function (data) {
                                var arr = [];
                                arr.push(data);
                                $scope.searchResults = arr;
                            }))
                            .error(function () {
                                $scope.isSearched = false;
                                $scope.noFlights = true;
                                return;
                            });
                }
            }

            $scope.noFlights = false;
            $scope.isSearched = true;
            $scope.searchResults = arr;
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
            if (arr === [] || arr === null || arr === "" || arr.length === 0) {
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
    var baseUrl = 'http://airline-plaul.rhcloud.com/api/flightinfo';
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
        }
    };
});

app.service('reservationService', function () {
     return {Field: 'heyheyTester' };
//    data.setData = function (data) {
//        return data;
//    };
    
//    data.getData = function (data) {
//        console.log('hey');
//        return data;
//    };
});

