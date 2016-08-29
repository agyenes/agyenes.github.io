'use strict';

var frontendTestApp = angular.module('frontendTestApp', ['ui.bootstrap']);

frontendTestApp.controller('testAppController', ['$scope', '$modal', '$log', '$http',

  function($scope, $modal, $log, $http) {
    $scope.removePerson = function(person) {
      var removedPerson = $scope.persons.indexOf(person);
      $scope.persons.splice(removedPerson, 1);
    };

    $http.get('data/persons.json').success(function(data) {
      $scope.persons = data;
    });

    $scope.showForm = function() {
      var modalInstance = $modal.open({
        templateUrl: 'modal-form.html',
        controller: ModalInstanceCtrl,
        scope: $scope,
        resolve: {
          userForm: function() {
            return $scope.userForm;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]);

var ModalInstanceCtrl = function($scope, $modalInstance, userForm) {

  $scope.newperson = {};

  $scope.submitForm = function() {
    $scope.persons.push($scope.newperson);
    $modalInstance.close('closed');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
