// Code goes here
'use strict';

(function () {
    var app = angular.module('myApp', ['ui.router']);

    app.controller('myController', function($scope,$location) {
        $scope.test = 'hey';

        $scope.change = function() {
            $scope.test = "hello";

        };

        $scope.logout = function () {
            $location.path('/logout');
        }
    });


    var routeResolver = function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('login', {
            url: '/login',
            views: {
                'main-view': {
                    templateUrl: 'views/login.html'
                }
            }
        })
        .state('logout', {
            url: '/logout',
            views: {
                'main-view': {
                    templateUrl: 'views/logout.html',
                    controller: 'LogoutController'
                }
            }
        })
        .state('home', {
            url: '/',
            views: {
                'main-view': {
                    templateUrl: 'views/home.html',
                    controller: 'myController'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    };

    app.config(routeResolver);
})();