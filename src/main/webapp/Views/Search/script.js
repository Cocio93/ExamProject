var app = angular.module('myApp.view3', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/search', {
            templateUrl: 'Views/Search/somethingawesome.html',
            controller: ''
        });
    }]);

app.controller('searchController', function ($scope) {
    var airports = ['Berlin', 'Copenhagen', 'London', 'Paris', 'Barcelona'];

});

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