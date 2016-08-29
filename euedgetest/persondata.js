'use strict';

var frontendTestApp = angular.module('frontendTestApp');

frontendTestApp.factory('personData', function($http) {
  var personsList = [];

  $http.get('data/persons.json').success(function(data) {
    personsList = data;
  });

  return {
    addPerson: function(newPerson) {
      personsList.push(newPerson);
    },

    deletePerson: function(person) {
      var removedPerson = personsList.indexOf(person);
      personsList.splice(removedPerson, 1);
    }
  };
});
