// my search  service

var searchapp = angular.module('searchApp',[]);

//writing a service to search employe
searchapp.run(function($http){
  //$http.defaults.headers.common.Authorization = 'Basic MzI1MTpBRElUSXNhbUAxMg==' ;
  $http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        'Access-Control-Allow-Credentials': true
        };
});

searchapp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

searchapp.service('searchEmployee',['$http','$q',function($http,$q){
    
	
    //function which searches the employee 
    this.searchemp = function(searchstring){
        //alert(searchstring);
        var ss = searchstring;
        var promise = $http.get('http://172.30.54.52:8080/search/employee',{ params : {q : ss}})
        .success(function(response){
            //console.log(JSON.stringify(response));
            console.log(response);
            return response;
        }).error(function(){
            console.log("error");
        });
        return  promise;
    }//function ends here
}]);// searchEmployee service ends here
searchapp.filter('highlight', function($sce) {
    return function(obj, phrase) {
		var text = obj.name;
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span style="color:yellow;">$1</span>')

      return $sce.trustAsHtml(text);
	  //obj.name = text;
	  //return obj;
}});
searchapp.controller('SearchController',['$scope','searchEmployee', '$sce',function($scope,searchEmployee, $sce){
	$scope.data =[{name:'jojo',employeeId:'jojo122'},{name:'jojo',employeeId:122},{name:'manu',employeeId:300},{name:'sajo',employeeId:122},{name:'sanu',employeeId:122}];
	
	$scope.searchResult = $scope.data;

    $scope.highlight = function(text, search) {
        if (!search) {
            return $sce.trustAsHtml(text.toString());
            //return text;
        }
        return $sce.trustAsHtml(text.toString().replace(new RegExp(search, 'gi'), '<span style="background-color:Green;">$&</span>'));
    };
}]);// my controller SearchController ends here