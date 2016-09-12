'use strict';

var dictionaryApp = angular.module('dictionaryApp', ['LocalStorageModule', 'ui.router']);

dictionaryApp.config(['localStorageServiceProvider', function(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('dictionaryApp');
}]);

dictionaryApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'dictController'
    })

    .state('scores', {
      url: '/scores',
      templateUrl: 'scores.html',
      controller: 'dictController'
    });
});

dictionaryApp.controller('dictController', ['$scope', '$http', 'localStorageService', function($scope, $http, localStorageService) {
  $scope.userScore = 0;
  $scope.userWords = [];

  localStorageService.keys().forEach(function(e) {
    $scope.userWords.push({name: e, score: localStorageService.get(e)});
  });

  $http.get('dict.json').success(function(dict) {
    $scope.dict = dict;
  });

  $scope.clearAll = function() {
    localStorageService.keys().forEach(function(e) {
      $scope.userWords.pop({name: e, score: localStorageService.get(e)});
    });
    localStorageService.clearAll();
  };

  function alreadyUsed(word) {
    for (var i = 0; i < localStorageService.keys().length; i++)  {
      if (word === localStorageService.keys()[i]) {
        return true;
      }
    }
  }

  function isInList(word) {
    var dictionary = $scope.dict;
    for (var i = 0; i < dictionary.length; i++)  {
      if (word === dictionary[i].name) {
        return true;
      }
    }
  }

  $scope.calculateScore = function(word) {
    var letters = [];
    var score = 0;
    for (var i = 0; i < word.length; i++) {
      if (letters.indexOf(word[i]) < 0) {
        letters.push(word[i]);
        score++;
      }
    }
    return score;
  };

  $scope.addWord = function(word) {
    $scope.message = '';
    if (alreadyUsed($scope.newWord.name)) {
      $scope.message = 'You have already tried this word!';
    } else if (isInList($scope.newWord.name)) {
      var score = $scope.calculateScore($scope.newWord.name);
      localStorageService.set($scope.newWord.name, score);
      $scope.userScore += score;
      $scope.message = 'Nice! You have ' + $scope.userScore + ' points';
    } else {
      $scope.message = 'This word is not in the list - try again!';
    }
    $scope.newWord.name = '';
  };
}]);
