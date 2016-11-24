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
        $scope.isFlexSearched = false;


        $scope.getSearchResults = function () {
            var date = $scope.searchParams.date;
            if ($scope.flextoggle === true) {
                var flexdate = $scope.searchParams.flexdate;
                var arr = [];
                while (date <= flexdate) {
                    $scope.searchResults = TicketFactory.getFromTickets(
                            $scope.searchParams.from,
                            $scope.searchParams.date,
                            $scope.searchParams.tickets
                            ).success((function (data) {

                        arr.push(data);
                        console.log(arr);
                        
                        
                    }   
                    ));
                    $scope.searchResults = arr;
                    date.setDate(date.getDate() + 1);
                    $scope.isFlexSearched = true;
                }
            } else {
                $scope.searchResults = TicketFactory.getFromTickets(
                        $scope.searchParams.from,
                        $scope.searchParams.date,
                        $scope.searchParams.tickets)
                        .success(function (data) {
                            var tmp = [];
                            tmp.push(data);
                            $scope.searchResults = tmp;
                            console.log("results : " + tmp);
                        });
            $scope.isSearched = true;
            }
        };
    }]);

app.factory('TicketFactory', function ($http) {
    var baseUrl = 'http://airline-plaul.rhcloud.com/api/flightinfo';
    return {
        getFromTickets: function (from, date, tickets) {
            console.log(date.toISOString() + 1);
            return $http({
                url: baseUrl + '/' + from + '/' + date.toISOString() + '/' + tickets,
                method: 'get'
            });
        }
    };
});