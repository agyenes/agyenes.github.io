'use strict';

var images = document.querySelectorAll('.image');
var filled = [];
var randomList;
var content;
var squaresFilled = 0;
var winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var resultField = document.querySelector('.result');
var resetButton = document.getElementById('reset');
var newGameButton = document.getElementById('new-game');
var scoreFieldX = document.querySelector('.player-x');
var scoreFieldO = document.querySelector('.player-o');
var scoreX = 0;
var scoreO = 0;

resetButton.addEventListener('click', resetScores);
newGameButton.addEventListener('click', newGame);

addEventListeners();

function addEventListeners() {
  for (var i = 0; i <= 8; i++) {
    images[i].addEventListener('click', fieldClicked(i));
  }
}

function updateFields() {
  scoreFieldX.textContent = 'Player X: ' + scoreX;
  scoreFieldO.textContent = 'Player O: ' + scoreO;
  resultField.textContent = 'New game!';
  resetImages();
}

function resetImages() {
  for (var i = 0; i <= 8; i++) {
    images[i].classList.remove('x') || images[i].classList.remove('o');
  }
}

function resetScores() {
  scoreX = 0;
  scoreO = 0;
  updateFields();
  newGame();
}

function newGame() {
  resetImages();
  updateFields()
  content = [];
  filled = [];
  randomList = [];
  squaresFilled = 0;
  for (var i = 0; i <= 8; i++) {
    filled[i] = false;
    content[i] = '';
    images[i].classList = '';
  }
}

function playerTurn(numberOfClickedField) {
  images[numberOfClickedField].classList.add('x');
  images[numberOfClickedField].classList.add('clicked');
  filled[numberOfClickedField] = true;
  content[numberOfClickedField] = 'X';
  squaresFilled++;
}

function computerTurn() {
  setTimeout(function() {
    randomList = [];
    for (var a = 0; a < filled.length; a++) {
      if (filled[a] === false) {
        randomList.push(a);
      }
    }
    if (randomList.length > 0) {
      var computerField = randomList[Math.floor(Math.random() * (randomList.length))];
      filled[computerField] = true;
      images[computerField].classList.add('o');
      images[computerField].classList.add('clicked');
      squaresFilled++;
      content[computerField] = 'O';
    }
    checkForWinners('O');
  }, 800);
}

function fieldClicked(i) {
  return function() {
    playerTurn(i);
    checkForWinners('X');
    computerTurn();
    checkForWinners('O');
    if (squaresFilled === 9) {
      checkForWinners('X');
      checkForWinners('O');
      resultField.textContent = 'Game result: Tie.';
      return;
    }
  };
}

function disableImages() {
  images.forEach(function(e, i) {
    images[i].classList.add('clicked');
  });
}

function checkForWinners(player) {
  for (var a = 0; a < winningCombinations.length; a++) {
    if (content[winningCombinations[a][0]] === player && content [winningCombinations[a][1]] ===	player && content[winningCombinations[a][2]] === player) {
      disableImages();
      win(player);
      scoreFieldX.textContent = 'Player X: ' + scoreX;
      scoreFieldO.textContent = 'Player O: ' + scoreO;
      return;
    }
  }
}

function win(player) {
  resultField.textContent = 'Game result: Player ' + player + ' wins!';
  if (player === 'X') {
    scoreX++;
    return;
  }
  if (player === 'O') {
    scoreO++;
    return;
  }
}

newGame();
