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

router.get('/api/users/',function(req,res){

  var queryById = req.query.userid;
  var queryByName = req.query.username;

  connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The database users contains: ', rows);

    res.json(rows);
  });

});

router.get('/api/archscores/',function(req,res){

  console.log('Get request received');

  var scoreId = req.query.scoreId;
  var userId = req.query.userId;
  if (scoreId && userId){
    connection.query('SELECT * FROM arch_scores WHERE score_id='+scoreId+" AND user_id="+userId, function(err, rows, fields) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The database users contains: ', rows);

    res.json(rows);
  });
  } else if (scoreId){
      connection.query('SELECT * FROM arch_scores WHERE score_id='+scoreId, function(err, rows, fields) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('The database users contains: ', rows);

        res.json(rows);
      });
  } else if (userId){
      connection.query('SELECT * FROM arch_scores WHERE user_id='+userId, function(err, rows, fields) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('The database users contains: ', rows);

        res.json(rows);
      });
  } else {
     res.json([]);
     return;
  }

});

router.put('/api/users',function(req,res){

    console.log('Put request received');

    connection.query('INSERT INTO users (user_name, user_password, user_email) VALUES ("test", "password", "aaa@mail.com")', function(err, rows, fields) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log('The database users contains: ', result);
        console.log('The database users contains: ', rows);
        res.send(rows);
  });

});




module.exports = router;