'use strict';

var inputField = document.querySelector('input');
var addButton = document.querySelector('.add_button');
var todoList = document.querySelector('ul');
addButton.addEventListener('click', newTodoItem);

var url = 'https://mysterious-dusk-8248.herokuapp.com/todos/';

getTodosFromServer(insertItemsToDOM);

function newTodoItem(event) {
  var todoText = inputField.value;
  addTodoToServer(todoText, appendTodo);
  inputField.value = '';
}

function getTodosFromServer(callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
      var todos = JSON.parse(xhr.response);
      callback(todos);
    };
  };
}

function addTodoToServer(text, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify({'text' : text}));
  xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
      var newTodoItem = JSON.parse(xhr.response);
      callback(newTodoItem);
    };
  };
}

function deleteTodoFromServer(id, callback) {
  var xhr = new XMLHttpRequest();
  var endpoint = url + String(id);
  xhr.open('DELETE', endpoint);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send();
  xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
      var deletedItem = JSON.parse(xhr.response);
      callback(deletedItem);
    };
  };
}

function completeTodoInServer(item, callback) {
  var xhr = new XMLHttpRequest();
  var endpoint = url + String(item.id);
  xhr.open('PUT', endpoint);
  xhr.setRequestHeader('content-type', 'application/json');
  xhr.send(JSON.stringify(item));
  xhr.onload = function() {
    if (xhr.readyState === xhr.DONE) {
      var updatedItem = JSON.parse(xhr.response);
      callback(updatedItem);
    };
  };
}

function insertItemsToDOM(items) {
  items.forEach(function(item) {
    appendTodo(item);
  });
}

function deleteItemFromDOM(item) {
  document.getElementById(item.id).remove();
}

function updateItemInDOM(item) {
  document.getElementById(item.id).classList.toggle('completed');
}

function appendTodo(item) {
  if (item.text.length > 0 && item.text.length < 35) {
    var todoItem = document.createElement('li');
    var trashIcon = document.createElement('button');
    var completeIcon = document.createElement('button');
    var iconContainer = document.createElement('div')
    todoItem.setAttribute('id', item.id);
    todoItem.innerText = item.text;
    iconContainer.appendChild(trashIcon);
    iconContainer.appendChild(completeIcon);
    todoItem.appendChild(iconContainer);
    trashIcon.classList.add('btn');
    completeIcon.classList.add('btn');
    trashIcon.classList.add('trash-button');
    completeIcon.classList.add('check-button');
    todoItem.classList.add('li_style');
    if (item.completed) {
      todoItem.classList.add('completed');
    }
    completeIcon.addEventListener('click', function() {
    trashIcon.addEventListener('click', trashIconEvent(item))
      completeTodoInServer({
        id: item.id,
        text: item.text,
        completed: !item.completed,
      }, updateItemInDOM);
    });
    todoList.appendChild(todoItem);
  }
}

function trashIconEvent(item) {
  return function(event) {
    deleteTodoFromServer(item.id, deleteItemFromDOM);
  }
}
