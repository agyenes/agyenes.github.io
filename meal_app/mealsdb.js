'use strict';

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "'root'",
  password: "12345",
  database: "meals"
});

var dbFunctions = (function(con) {

  con.connect(function(err){
    if(err){
      console.log("Error connecting to Db");
      return;
    }
    console.log("Connection established");
  });

  function errHandling(err){
    if(err) {
      console.log(err.toString());
      return;
    }
  }

  function getMeals(callback) {
    con.query('SELECT * FROM meals;', function(err, rows){
      errHandling(err)
      callback(rows);
    });
  };

  function postMeals(item, callback) {
    con.query('INSERT INTO meals (name, calories, date) VALUES (?, ?, ?)', [item.name, item.calories, item.date], function(err, result){
      errHandling(err)
      callback({id: result.insertId, name: item.name, calories: item.calories, date: item.date, status: "ok"});
    });
  };

  function deleteMeals(id, callback) {
    con.query('DELETE FROM meals WHERE id = ?;', id, function(err,response){
      errHandling(err)
      if (response.affectedRows === 1) {
        callback({status:"ok"});
      } else if (response.affectedRows === 0) {
        callback({status: "not exists"});
      }
    });
  };

  return {
    getMeals,
    postMeals,
    deleteMeals
  }
}(con));

module.exports = dbFunctions;


  // function getMealsById(req, callback) {
  //   con.query('SELECT * FROM meals WHERE id = ?;', req.body.id, function(err, rows){
  //     errHandling(err)});
  //     callback(rows);
  // };


  // function updateMeals(req, callback) {
  //   con.query('UPDATE meals SET name = ?, calories = ?, date = ? WHERE id = ?;', req.body.name, req.body.calories, req.body.date, req.body.id, function(err, result){
  //     errHandling(err)});
  //     callback(rows);
  // };
