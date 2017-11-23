/**
 * Conway's Game of Life
 *
 * This is the main angular.js file.
 *
 * @author Peter Perger <peter.perger@ennosol.eu>
 */
angular
    .module('game', [
        'game.home'
    ])
    .config(function myAppConfig($locationProvider, $urlRouterProvider, $httpProvider) {

        // HTML 5 mode - URLs without hashmark (#)
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Redirect any other route to root page
        $urlRouterProvider.otherwise('/');
    })
    .controller('AppCtrl', function AppCtrl($scope, $location) {});