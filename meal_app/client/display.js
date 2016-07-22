'use strict';

const display = (function(){

  function displayAll(response){
    response.forEach(function (e) {appendMeal(e)});
  }

  function displayNew(response,inputdata){
    appendMeal(JSON.parse(response));
  }

  var sumOfCal = 0;

  function appendMeal(item) {

    var meal = document.createElement('tr');
    meal.id = item.id;
    var table = document.querySelector('table');

    table.appendChild(meal);

    var mealId = document.createElement('td');
    mealId.innerHTML = item.id;
    meal.appendChild(mealId);
    mealId.classList.add('id_col');

    var mealName = document.createElement('td');
    mealName.innerHTML = item.name;
    meal.appendChild(mealName);
    mealName.classList.add('name_col');

    var mealCalories = document.createElement('td');
    mealCalories.innerHTML = item.calories;
    meal.appendChild(mealCalories);
    mealCalories.classList.add('cal_col');
    sumOfCal += +item.calories;

    if (item.date === null) {
      var dateOut = ''
    } else {
      var dateOut = item.date.slice(0,10);
    }

    var mealDate = document.createElement('td');
    mealDate.innerHTML = dateOut;
    meal.appendChild(mealDate);
    mealDate.classList.add('date_col');

    var trashCell = document.createElement('td');
    var trashIcon = document.createElement('button');
    trashIcon.addEventListener('click', function() {
      deleteElement(item.id);
    });
    trashCell.appendChild(trashIcon);
    meal.appendChild(trashCell);
    trashCell.classList.add('trash');

    trashIcon.classList.add('btn');
    trashIcon.classList.add('trash-button');

    var sumUsed = 300;
    var balanceCal = sumOfCal - sumUsed;

    var summary = document.querySelector('.summary');

    var sumCal = document.querySelector('.sum_cal');
    sumCal.innerHTML = 'Your calorie input was ' + sumOfCal + ' Cal';

    var usedCal = document.querySelector('.used_cal');
    usedCal.innerHTML = 'You have used ' + sumUsed + ' Cal';

    var balance = document.querySelector('.balance');
    balance.innerHTML = 'Your calorie balance is ' + balanceCal + ' Cal';

    inputname.value = '';
    inputcal.value = '';
    inputdate.value = '';
  }

  function deleteDisplay(id){
    console.log(id);
    var table = document.querySelector('table');
    var meal = document.querySelectorAll('tr');
    for (var i = 0; i < meal.length; i++) {
      console.log(meal[i].id);
      if (+meal[i].id === id) {
        table.removeChild(meal[i]);
      }
    }
  }

  return {
    displayAll,
    displayNew,
    deleteDisplay,
    appendMeal
  };
}());
