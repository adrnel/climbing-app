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

router.get('/api/users/:userid/:username',function(req,res){

  console.log('Get request received');

  var queryById = req.params.userid;
  console.log("Get the data for " + queryById);
  var queryByName = req.params.username;
  console.log("Get the data for " + queryByName);

  connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('The database users contains: ', rows);

    res.json(rows);
  });

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