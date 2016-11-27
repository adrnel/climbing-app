var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'climbing'
});

connection.connect();

router.get('/api/login/',function(req,res){

  var username = req.query.username;
  var password = req.query.password;
  console.log('username', username);
  console.log('password', password);

  connection.query("SELECT * FROM users WHERE user_name='"+username+"' AND user_password='"+password+"'", function(err, rows, fields) {
    if (err) {
        console.error(err);
        res.json(["Query error"]);
        return;
    }
    console.log('The database users contains: ', rows);
    if(rows.length > 0){
        res.json(rows);
    } else {
        res.status(403);
        res.json(["Invalid login details"]);
    }
  });

});

router.get('/api/archscores/',function(req,res){

  console.log('Get request received');

  var scoreId = req.query.scoreId;
  var userId = req.query.userId;
  if (scoreId && userId){
    connection.query('SELECT * FROM arch_scores WHERE score_id='+scoreId+' AND user_id='+userId, function(err, rows, fields) {
    if (err) {
        console.error(err);
        res.json(["Query error"]);
        return;
    }
    console.log('The database users contains: ', rows);

    if(rows.length > 0){
        res.json(rows);
    } else {
        res.status(204);
        res.json(["No scores found"]);
    }
  });
  } else if (scoreId){
      connection.query('SELECT * FROM arch_scores WHERE score_id='+scoreId, function(err, rows, fields) {
        if (err) {
            console.error(err);
            res.json(["Query error"]);
            return;
        }
        console.log('The database users contains: ', rows);

        if(rows.length > 0){
            res.json(rows);
        } else {
            res.status(204);
            res.json(["No scores found"]);
        }
      });
  } else if (userId){
      connection.query('SELECT * FROM arch_scores WHERE user_id='+userId, function(err, rows, fields) {
        if (err) {
            console.error(err);
            res.json(["Query error"]);
            return;
        }
        console.log('The database users contains: ', rows);

        if(rows.length > 0){
            res.json(rows);
            res.json(["Query error"]);
        } else {
            res.status(204);
            res.json(["No scores found"]);
        }
      });
  } else {
     res.status(404);
     res.json([]);
     return;
  }

});

router.put('/api/users',function(req,res){

    console.log('Put request received');

    connection.query('INSERT INTO users (user_name, user_password, user_email) VALUES ("test", "password", "aaa@mail.com")', function(err, rows, fields) {
        if (err) {
            console.error(err);
            res.json(["Query error"]);
            return;
        }
        //console.log('The database users contains: ', result);
        console.log('The database users contains: ', rows);
        res.send(rows);
  });

});




module.exports = router;