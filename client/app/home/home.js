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
.controller('HomeCtrl', function HomeController($scope, $state, $http) {

    $scope.cells = {"2":{"3":{"state":1}},"3":{"3":{"state":1}},"4":{"3":{"state":1}}};
    $scope.size = 5;
    $scope.world = [];
    $scope.refreshIntervalId = null;
    $scope.run = false;

    // Create new world with the given size
    $scope.createWorld = function() {
        $scope.world = Array.apply(null, Array(parseInt($scope.size))).map(function (_, i) {return i+1;});
    };
    $scope.createWorld();

    // Evolve next step
    $scope.step = function() {
        $http({
            url: 'http://localhost:3000/evolve',
            method: 'POST',
            data: {
                cells: $scope.cells
            }
        }).then(function(response) {
            $scope.cells = response.data;
        });
    };

    // Continously evolve the world
    $scope.evolve = function() {
        $scope.refreshIntervalId = setInterval($scope.step, 1000);
        $scope.run = true;
    }

    // Stop evolving
    $scope.stop = function() {
        clearInterval($scope.refreshIntervalId);
        $scope.run = false;
    };

});
