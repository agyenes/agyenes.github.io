'use strict';

var url = 'http://localhost:3000/meals/';

var inputname = document.querySelector('.food');
var inputcal = document.querySelector('.calories');
var inputdate = document.querySelector('.date');
var addButton = document.querySelector('.add_button');
var container = document.querySelector('.container');

addButton.addEventListener('click', addNewElement);

function newMeal() {
  var data = {
    name: inputname.value,
    calories: inputcal.value,
    date: inputdate.value
  };
  return data;
}

function addNewElement(e){
  e.preventDefault();
  if (inputname.value !=='' && inputcal.value !=='' && inputdate.value !==''){
    request.addMealsToServer(JSON.stringify(newMeal()),function(response) {
      display.displayNew(response, newMeal());
    }
  )}
}

function get() {
  request.getMealsFromServer(function(response) {
    display.displayAll(JSON.parse(response));
  })
}

function deleteElement(id) {
  request.deleteMealFromServer(id, function(response) {
    if (response === '{"status":"ok"}'){
      display.deleteDisplay(id)
    };
  })
}

get()
