'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('rampage.services', ['ngResource']).
  value('version', '0.1');
  
angular.module('rampage.services').factory('kinvey', ['$resource', '$http', 'SERVICE_URL', function($resource, $http, SERVICE_URL) {
	
	var token = 'Basic a2lkX1RlMGlDYllzWWY6ZjA0Y2ZjMTVkYjA4NDE2ZThkNmRiMzA5NGQwMTYwYjA=';
	$http.defaults.headers.common['Authorization'] = token;
    $http.defaults.headers.post['Authorization'] = token;
	$http.defaults.headers.common['X-Kinvey-API-Version'] = '3';
	
	var service = {
		ping : function() {
			return $http({
				url: SERVICE_URL,
				method: 'GET'
			});
		},
		listTasks:function(){
			return $http({
				method: 'GET',
				url: SERVICE_URL + '/Task'				
			});
		},
		
		saveTask: function($scope){
			
			return $http({
				url: SERVICE_URL + '/Task',
				method: 'POST',
				data: {
					"Content": $scope.task.Content,
					"Status": $scope.task.Status,
					"CreatedDate":new Date().getTime()
				}
			});
		},
		
		editTask: function($scope){
		
			return $http({
				url: SERVICE_URL + '/Task/'+ $scope.task._id,
				method: 'PUT',
				data: {
					"Content": $scope.task.Content,
					"Status": $scope.task.Status,
					"CreatedDate":$scope.task.CreateDate
				}
			});
		}
	};
	
	
	
	return service;
}]);
