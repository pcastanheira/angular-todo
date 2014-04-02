var appTodo = angular.module('appTodo', []);

function mainController($scope, $http){
	$scope.formData = {};
	
	//landing on page, get todos
	$http.get('/api/todos')
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
		
	//submit form to API	
	$scope.createTodo = function(){
		$http.post('/api/todos', $scope.formData)
		.success(function(data){
			//clear form at success
			$scope.formData = {};
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};
	
	//delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};	
}