var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'climbing'
});

connection.connect();

router.put('/api/login/', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  console.log('username', username);
  console.log('password', password);

  connection.query("SELECT * FROM users WHERE user_name='" + username + "' AND user_password='" + password + "'", function(err, rows, fields) {
    if (err) {
      console.error(err);
      res.json(["Query error"]);
      return;
    }
    console.log('The database users contains: ', rows);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(403);
      res.json(["Invalid login details"]);
    }
  });

});

router.get('/api/archscores/', function(req, res) {

  console.log('Get request received');

  var scoreId = req.query.scoreId;
  var userId = req.query.userId;
  if (scoreId && userId) {
    connection.query('SELECT * FROM arch_scores WHERE score_id=' + scoreId + ' AND user_id=' + userId, function(err, rows, fields) {
      if (err) {
        console.error(err);
        res.status(404);
        res.json(["Query error"]);
        return;
      }
      console.log('The database users contains: ', rows);

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(204);
        res.json(["No scores found"]);
      }
    });
  } else if (scoreId) {
    connection.query('SELECT * FROM arch_scores WHERE score_id=' + scoreId, function(err, rows, fields) {
      if (err) {
        console.error(err);
        res.status(404);
        res.json(["Query error"]);
        return;
      }
      console.log('The database users contains: ', rows);

      if (rows.length > 0) {
        res.json(rows);
      } else {
        res.status(204);
        res.json(["No scores found"]);
      }
    });
  } else if (userId) {
    connection.query('SELECT * FROM arch_scores WHERE user_id=' + userId, function(err, rows, fields) {
      if (err) {
        console.error(err);
        res.status(404);
        res.json(["Query error"]);
        return;
      }
      console.log('The database users contains: ', rows);

      if (rows.length > 0) {
        res.json(rows);
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

router.post('/api/signup/', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  console.log('email', email);
  console.log('username', username);
  console.log('password', password);

  if (username && password && email) {
    connection.query("SELECT * FROM users WHERE user_email='" + email + "'", function(err, rows, fields) {
      if (err) {
        console.error(err);
        res.status(404);
        res.json(["Query error"]);
        return;
      } else if (rows.length > 0) {
        res.status(403);
        res.json(["This email address already exists"]);
        return;
      } else {
        connection.query("SELECT * FROM users WHERE user_name='" + username + "'", function(err, rows, fields) {
          if (err) {
            console.error(err);
            res.status(404);
            res.json(["Query error"]);
            return;
          } else if (rows.length > 0) {
            res.status(403);
            res.json(["This username already exists"]);
            return;
          } else {
            connection.query("INSERT INTO `climbing`.`users` (`user_name`, `user_password`, `user_email`, `user_role`) VALUES ('" + username + "', '" + password + "', '" + email + "', 'user')", function(err, rows, fields) {
              if (err) {
                console.error(err);
                res.status(404);
                res.json(["Query error"]);
                return;
              }
            });
            res.status(200);
            res.json(["The user has been added to the database"]);
          }
        });
      }
    });

  } else {
    res.status(412);
    res.json(["Incorrect parameters sent"]);
  }

});




module.exports = router;