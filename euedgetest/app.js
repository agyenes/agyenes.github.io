'use strict';

var frontendTestApp = angular.module('frontendTestApp', ['ui.bootstrap']);

frontendTestApp.controller('testAppController', ['$scope', '$modal', '$log', '$http',

  function($scope, $modal, $log, $http) {
    $scope.removePerson = function(person) {
      var removedPerson = $scope.persons.indexOf(person);
      $scope.persons.splice(removedPerson, 1);
    };

    function personAdder() {
      return {
        name: $scope.newperson.name,
        job: $scope.newperson.job,
        age: $scope.newperson.age,
        nick: $scope.newperson.nick,
        employee: $scope.newperson.employee
      };
    }

    function clearInputFields() {
      $scope.newperson.name = '';
      $scope.newperson.job = '';
      $scope.newperson.age = '';
      $scope.newperson.nick = '';
      $scope.newperson.employee = '';
    }

    $scope.addPerson = function() {
      var personToAdd = personAdder();
      $scope.persons.push(personToAdd);
      clearInputFields();
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

  $scope.form = {};

  $scope.submitForm = function() {
    // $scope.addPerson();
    $modalInstance.close('closed');
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
