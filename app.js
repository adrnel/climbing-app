var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'climbing'
});



app.get('/', function (req, res) {

  connection.connect();

  connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) throw err;
    console.log('The database users contains: ', rows);

    res.send(rows);
  });


  connection.end();


});

app.use(express.static(__dirname + '/dist'));

app.get('/page', function (req, res) {
  res.send('Page!');
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

