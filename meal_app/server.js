'use strict';

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var id = 0;
var mealsdb = require('./mealsdb')

app.use(express.static(__dirname + '/client/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.contentType('application/json');
  next();
});

app.get('/meals', function(req, res) {
  mealsdb.getMeals(function(rows){
    res.send(rows);
  })
});

app.post('/meals', function(req, res) {
  var item = {
    'name': req.body.name,
    'calories': req.body.calories,
    'date': req.body.date
  }
  mealsdb.postMeals(item, function(result) {
    res.send(result)
  });
});

app.delete('/meals/:id', function(req, res) {
  mealsdb.deleteMeals(req.params.id, function(result){
    res.send(JSON.stringify(result))
  });
})

app.listen(3000);
