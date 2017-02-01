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

    $scope.cells = {};
    $scope.size = 25;
    $scope.world = [];
    $scope.refreshIntervalId = null;
    $scope.run = false;
    $scope.resolution = 15;
    $scope.lifs = [];
    $scope.selectedLif = 'empty';

    // Create new world with the given size
    $scope.createWorld = function() {
        $scope.size = parseInt($scope.size);
        if ($scope.size < 5) {
            $scope.size = 5;
        }
        if ($scope.size > 100) {
            $scope.size = 100;
        }
        var size = $scope.size
        $scope.world = Array.apply(null, Array(size)).map(function (_, i) {return i - parseInt(size / 2);});
    };
    $scope.createWorld();

    // Get list of lifs files
    $scope.getLifs = function() {
        $http({
            url: 'http://localhost:3000/lif',
            method: 'GET',
        }).then(function(response) {
            $scope.lifs = response.data;
            console.log($scope.lifs);
        });
    };
    $scope.getLifs();

    // Load lif file to board
    $scope.loadLif = function() {
        if ($scope.selectedLif === 'empty') {
            $scope.cells = {};
        } else {
            $http({
                url: 'http://localhost:3000/lif',
                method: 'POST',
                data: {
                    name: $scope.selectedLif
                }
            }).then(function(response) {
                $scope.cells = response.data;
            });
        }
    };

    // Evolve next step
    $scope.step = function() {
        $http({
            url: 'http://localhost:3000/evolve',
            method: 'POST',
            data: {
                size: parseInt($scope.size),
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

    // Toggle life of given cell
    $scope.toggleLife = function(x, y) {
        if (typeof $scope.cells[x] === 'undefined') {
            $scope.cells[x] = {};
        }
        if ((typeof $scope.cells[x][y] === 'undefined') ||
            ($scope.cells[x][y].state === 0)){
            $scope.cells[x][y] = { "state": 1 };
        } else {
            $scope.cells[x][y] = { "state": 0 };
        }
    };

});
