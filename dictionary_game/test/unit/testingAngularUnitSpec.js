describe('dictController', function() {
  var $httpBackend;
  var $rootScope;
  var createController;
  var scope;

  beforeEach(module('dictionaryApp'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    createController = function() {
      scope = $rootScope.$new();
      return $controller('dictController', {'$scope': scope});
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('initailizes scores scope', function() {
    createController();
    expect(scope.userScore).toBeDefined();
  });

  it('should test one word in dictionary', function() {
    createController();
    scope.newWord = 'rhino';
    scope.addWord();
    expect(scope.message).toBe('Nice! You have 5 points');
  });

  it('should test word with not only unique letters', function() {
    createController();
    scope.newWord = 'scramblers';
    scope.addWord();
    expect(scope.message).toBe('Nice! You have 8 points');
  });

  it('should test word in dictionary but already used', function() {
    createController();
    scope.newWord = 'scramblers';
    scope.addWord();
    expect(scope.message).toBe('You have already tried this word!');
  });

  it('should test invalid word', function() {
    createController();
    scope.newWord = 'whatever';
    scope.addWord();
    expect(scope.message).toBe('This word is not in the list - try again!');
  });
});
