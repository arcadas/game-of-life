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

    $scope.cells = {"2":{"3":{"state":1}},"3":{"3":{"state":1}},"4":{"3":{"state":1}}};
    $scope.world = Array.apply(null, Array(5)).map(function (_, i) {return i+1;});

});
