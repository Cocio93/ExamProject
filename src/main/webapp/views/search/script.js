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
        $scope.searchParams = {from: '', to: '', date: '', tickets: ''};
        $scope.searchResults = {};
        
        $scope.getSearchResults = function() {
            $scope.searchResults = TicketFactory.getFromTickets(
                $scope.searchParams.from,
                $scope.searchParams.date,
                $scope.searchParams.tickets)
                .success(function (data) {
                    console.log(data);
                    $scope.searchResults = data;
                });
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