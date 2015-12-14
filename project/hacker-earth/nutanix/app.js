// Code goes here
//'use strict';

var app = angular.module('dealsHub', []);
app.controller('HomeController', function($scope, $http) {
    $scope.test = 'hey';

    $scope.change = function() {
        $scope.test = "hello";
    };

    $http.get('http://nutanix.0x10.info/api/deals?type=json&query=list_deals').then(
        function (data) {
            $scope.deals = data.data.deals;
            $scope.deals.forEach(function(item) {
                item.link = decodeURIComponent(item.link);
                item.image = decodeURIComponent(item.image);
            });
        },
        function (data) {
            throw new Error(data);
        });
});