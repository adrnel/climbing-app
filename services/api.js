var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var connection = mysql.createConnection({
  host: process.env.HOSTDB,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect();

router.post('/api/logout', function(req, res) {
    req.session.destroy();
    res.status(200);
    res.json(["Logged out"]);
});

router.put('/api/login/', function(req, res) {

  var username = req.body.username;
  var password = req.body.password;
  //console.log('username', username);
  //console.log('password', password);

  connection.query("SELECT * FROM users WHERE user_name='" + username + "'", function(err, rows, fields) {
    if (err) {
      console.log('this.sql', this.sql); //command/query
      console.error(err);
      res.json(["Query error"]);
      return;
    }
    if (rows.length > 0 && bcrypt.compareSync(password, rows[0].user_password)) {
        req.session.user = {};
        req.session.user.user_id = rows[0].user_id;
        req.session.user.user_name = rows[0].user_name;
        req.session.user.user_email = rows[0].user_email;
        req.session.user.user_role = rows[0].user_role;
        req.session.user.user_group = rows[0].user_group;
        res.json(req.session.user);
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
  var fromDate = req.query.fromDate;
  var toDate = req.query.toDate;
  if (req.session.user.user_id && fromDate && toDate) {
    console.log("Correct Score Function");
    connection.query('SELECT * FROM arch_scores WHERE user_id=' + req.session.user.user_id + " AND score_date >= STR_TO_DATE('"+fromDate+"', '%Y-%m-%d') AND score_date <= STR_TO_DATE('"+toDate+"', '%Y-%m-%d')", function(err, rows, fields) {
      if (err) {
        console.log('this.sql', this.sql); //command/query
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
  } else if (scoreId && userId) {
    connection.query('SELECT * FROM arch_scores WHERE score_id=' + scoreId + ' AND user_id=' + userId, function(err, rows, fields) {
      if (err) {
        console.log('this.sql', this.sql); //command/query
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
        console.log('this.sql', this.sql); //command/query
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
        console.log('this.sql', this.sql); //command/query
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
  } else if(req.session.user.user_id) {
      connection.query('SELECT * FROM arch_scores WHERE user_id=' + req.session.user.user_id, function(err, rows, fields) {
          if (err) {
              console.log('this.sql', this.sql); //command/query
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
  } else {res.status(404);
    res.json([]);
    return;
  }

});

router.post('/api/archscores/', function(req, res) {
  var spotty = req.body.spotty || 0;
  var black = req.body.black || 0;
  var tiger = req.body.tiger || 0;
  var blue = req.body.blue || 0;
  var salmon = req.body.salmon || 0;
  var yellow = req.body.yellow || 0;
  var purple_yellow = req.body.purple_yellow || 0;
  var hendrix = req.body.hendrix || 0;
  var red = req.body.red || 0;
  var white = req.body.white || 0;
  var green = req.body.green || 0;
  var score = req.body.score || 0;
  var score_date = req.body.score_date || (new Date()).toISOString().substring(0, 10);
  connection.query("INSERT INTO `" + process.env.DATABASE + "`.`arch_scores` (`user_id`, `spotty`, `black`, `tiger`, `blue`, `salmon`, `yellow`, `purple_yellow`, `hendrix`, `red`, `white`, `green`, `score`, `score_date`) VALUES (" + req.session.user.user_id + ", " + spotty + ", " + black + ", " + tiger + ", " + blue + ", " + salmon + ", " + yellow + ", " + purple_yellow + ", " + hendrix + ", " + red + ", " + white + ", " + green + ", " + score + ", STR_TO_DATE('"+score_date+"', '%Y-%m-%d'))", function(err, rows, fields) {
    if (err) {
      console.log('this.sql', this.sql); //command/query
      console.error(err);
      res.status(404);
      res.json(["Query error"]);
      return;
    } else {
        res.status(200);
        res.json(["The score has been added to the database"]);
    }
  });
});

router.post('/api/signup/', function(req, res) {

  var username = req.body.username;
  var password =  bcrypt.hashSync(req.body.password, 10);
  var email = req.body.email;
  console.log('email', email);
  console.log('username', username);
  console.log('password', password);

  if (username && password && email) {
    connection.query("SELECT * FROM users WHERE user_email='" + email + "'", function(err, rows, fields) {
      if (err) {
        console.log('this.sql', this.sql); //command/query
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
            console.log('this.sql', this.sql); //command/query
            console.error(err);
            res.status(404);
            res.json(["Query error"]);
            return;
          } else if (rows.length > 0) {
            res.status(403);
            res.json(["This username already exists"]);
            return;
          } else {
            connection.query("INSERT INTO `" + process.env.DATABASE + "`.`users` (`user_name`, `user_password`, `user_email`, `user_role`, `user_group`) VALUES ('" + username + "', '" + password + "', '" + email + "', 'user', 'default')", function(err, rows, fields) {
              if (err) {
                console.log('this.sql', this.sql); //command/query
                console.error(err);
                res.status(404);
                res.json(["Query error"]);
                return;
              } else {
                  res.status(200);
                  res.json(["The user has been added to the database"]);
              }
            });
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