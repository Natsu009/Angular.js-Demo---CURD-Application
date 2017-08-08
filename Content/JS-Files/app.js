var CRUDapp = angular.module('CRUDapp',['ngRoute','ngAnimate','xeditable','ui.select','ui.bootstrap']);


CRUDapp.config(['$routeProvider',function($routeProvider){
  $routeProvider.
  when('/Home',{
    templateUrl: 'Views/Home.html'
  })
  .when('/List',{
    templateUrl: 'Views/List.html',
    controller : 'ListController'
  })
  .otherwise({
      redirectTo: '/Home'
  });

}]);

/* To choose the theme of X-editable inline-edit  */
CRUDapp.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});


CRUDapp.controller('ListController', ['$scope','$http',function($scope,$http){

    /* Fetch the Crus.json file */
    $http({
       method: 'get',
       url: 'Data/Crud.json'
    }).then(function (Data){
       $scope.Person = Data.data;
    },function (error){
      console.log(error,'Cant get data');
    });

    /* List of Universities */
    $scope.University_List = ['PACE','NORTHEASTERN','NJIT','DREXEL','NYU'];

    /* Validation for phone number */
    $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;

    /* Remove Student Function */
    $scope.RemoveStudent  = function(row){
      var DeleteStudent = $scope.Person.indexOf(row);
      $scope.Person.splice(DeleteStudent,1);
    };

    $scope.FormStudent = false;
    $scope.AddStudents = function(){
      $scope.FormStudent = true;
    };

    /* Add a new student */
    $scope.AddNewStudents = function(NewStudent){
       $scope.Person.push({
         Profile : "Content/Image/Param.jpg",
         FirstName: $scope.NewStudent.FirstName,
         LastName : $scope.NewStudent.LastName,
         PhoneNo  : $scope.NewStudent.PhoneNo,
         University:$scope.NewStudent.University
       });

       $scope.NewStudent.Profile = "";
       $scope.NewStudent.FirstName = "";
       $scope.NewStudent.LastName = "";
       $scope.NewStudent.PhoneNo = "";
       $scope.NewStudent.University = "";
       $scope.FormStudent = false;
    };



}]);
