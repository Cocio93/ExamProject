var app = angular.module('myApp.view3', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'Views/Search/somethingawesome.html',
            controller: ''
        });
    }]);

app.controller('searchController', ['TicketFactory', '$scope', function (TicketFactory, $scope) {
        $scope.airports = ['Berlin', 'Copenhagen', 'London', 'Paris', 'Barcelona'];
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
    var baseUrl = 'http://airline-plaul.rhclod.com/api';
    return {
        getFromTickets: function (from, date, tickets) {
            return $http({
                url: baseUrl + '/' + from + '/' + date + '/' + tickets,
                method: 'get'
            });
        }
    };
});