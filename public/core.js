var Rx = angular.module('rx', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/rxs')
		.success(function(data) {
			$scope.rxs = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	$scope.createRx = function() {
		$http.post('/api/rxs', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.rxs = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.deleteRx = function(id) {
		$http.delete('/api/rxs/' + id)
			.success(function(data) {
				$scope.rxs = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}