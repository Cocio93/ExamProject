var app = angular.module('myApp.searchModule', ['ngRoute']);
 
 
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'views/search/SearchPage.html',
            controller: 'searchCtrl'
        });
    }]);
 
app.controller('searchCtrl', ['TicketFactory', '$scope', function (TicketFactory, $scope) {
        $scope.airports = ['Berlin', 'CPH', 'London', 'Paris', 'Barcelona'];
        $scope.numOfTickets = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        $scope.searchParams = {from: '', to: '', date: '', tickets: '', flexdate: ''};
        $scope.searchResults = [];
        $scope.isSearched = false;
        $scope.flextoggle = false;
 
        $scope.getSearchResults = function () {
            if ($scope.flextoggle === true) {
                var date = $scope.searchParams.date;
                var flexdate = $scope.searchParams.flexdate;
                while (date <= flexdate) {
                    console.log("Inside flexsearch")
                    console.log(date);  
                    console.log(flexdate);
                    $scope.searchResults = TicketFactory.getFromTickets(
                            $scope.searchParams.from,
                            $scope.searchParams.date,
                            $scope.searchParams.tickets
                            ).success((function (data) {
                        console.log(data);
                        $scope.searchParams.searchResults = data;
                    }
                    ));
                    date.setDate(date.getDate() + 1);
                }
            } else {
                $scope.searchResults = TicketFactory.getFromTickets(
                        $scope.searchParams.from,
                        $scope.searchParams.date,
                        $scope.searchParams.tickets)
                        .success(function (data) {
                            console.log(data);
                            $scope.searchResults = data;
 
                        });
            }
            $scope.isSearched = true;
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