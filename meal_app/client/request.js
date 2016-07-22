'use strict';

const request = (function(){
  var host = 'http://10.19.1.113:3000/meals/';

  function xhrRequest(method, url, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function() {
      if (xhr.readyState === xhr.DONE) {
        callback(xhr.response);
      }
    };
    xhr.send(data);
  }

  function getMealsFromServer(callback) {
    xhrRequest('GET', host, null, callback);
  }

  function addMealsToServer(inputdata, callback) {
    xhrRequest('POST', host, inputdata, callback);
  }

  function deleteMealFromServer(id, callback) {
    xhrRequest('DELETE', host + id, null, callback);
  }

  return {
    getMealsFromServer,
    addMealsToServer,
    deleteMealFromServer,
  };
}());
