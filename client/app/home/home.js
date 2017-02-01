/**
 * Conway's Game of Life
 *
 * Home (main page) module, state, controller.
 *
 * @author Peter Perger <peter.perger@ennosol.eu>
 */
angular.module( 'game.home', [
    'ui.router',
])
.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeCtrl',
        templateUrl: 'app/home/home.html',
        data: {
            requiresLogin: true
        }
    });
})
.controller('HomeCtrl', function HomeController($scope, $state) {

    $scope.title = 'Game of Life';

});
