// Hacker earth app

//Creating module and controller
var app = angular.module('hackerEarthChallenge', []);
app.controller('HomeController', function($scope, $http, $interval) {
    // API calls
    $http.get('https://hackerearth.0x10.info/api/problems?type=json&query=list_problems').then(
        function (data) {
            $scope.problems = data.data.problems;
            $scope.problems.forEach(function(item) {
                item.url = item.url ? decodeURIComponent(item.url) : null;
                item.image = item.image ? decodeURIComponent(item.image) : 'http://www.apnaprops.com/images/noPhoto-icon.png';
                item.tags = item.tags ? item.tags.toString() : "";
                var like = window.localStorage.getItem(item.url);
                item.like = like ? like : 0;
                item.ratingCount = Math.ceil(item.rating);
            });
        },
        function (data) {
            throw new Error(data);
        });

    getApiHits();

    // Keep track of API hits
    $interval(function() {
        getApiHits();
    }, 7000);

    function getApiHits() {
        $http.get('http://hackerearth.0x10.info/api/problems?type=json&query=api_hits').then(
            function (data) {
                $scope.meta = {
                    apiHits: data.data.api_hits
                };
            },
            function (data) {
                throw new Error(data);
            });
    }

    // Search for the tag in list
    $scope.searchTag = function (item) {
        if (!$scope.searchText) {
            return true;
        }

        if(item.tags && item.tags.toLowerCase().indexOf($scope.searchText.toLowerCase()) !== -1) {
            return true;
        }
        else {
            return false;
        }
    };

    //Clear search text
    $scope.clearSearchText = function () {
        $scope.searchText = '';
    };

    // Watch for rating change to sort the list
    $scope.$watch('rating', function (newValue) {
        if (!newValue) {
            return;
        }
        if (newValue === 'like') {
            $scope.problems.sort(function(obj1, obj2) {
                return Number(obj1.like) > Number(obj2.like);
            });
        }
        else {
            $scope.problems.sort(function(obj1, obj2) {
                return Number(obj1.rating) > Number(obj2.rating);
            });
        }
    });

    // Like
    $scope.like = function (index) {
        var problem = $scope.problems[index];
        var like = problem.like ? Number(problem.like) + 1 : 1;
        problem.like = like;
        window.localStorage.setItem(problem.url, like);
    };

    // Get rating stars
    $scope.getRatingStars = function (count) {
        return new Array(count);
    };
});