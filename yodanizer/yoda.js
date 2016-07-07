'use strict';

var xhr = new XMLHttpRequest();
var button = document.querySelector('#submit');
var response = document.querySelector('p');

var getRequestBody = function(event) {
  event.preventDefault();
  var sentence = document.querySelector('#sentence').value;
  sentence.replace(' ','+');
  var complete = '?sentence=' + sentence;
  xhr.open("GET", 'https://yoda.p.mashape.com/yoda' + complete, true);
  xhr.setRequestHeader("X-Mashape-Key", "c7BEPKBGCCmshxjwwqKlHQRXeh4Sp1WCTxVjsnVUEAamBpcyQo", "Accept", "text/plain")
  xhr.send(null);
  xhr.onload = function() {
    response.textContent = xhr.responseText;
  }
}

button.addEventListener("click", getRequestBody);
