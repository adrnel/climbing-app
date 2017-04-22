var express = require('express');
var app = express();
var env = require('./env');
var routes = require('./routes/index');
var api = require('./services/api');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var session = require('express-session');

app.use(session({
    secret: process.env.CLIMBING_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use('/', routes);

app.use('/', api);

app.use(express.static(__dirname + '/dist'));

app.get('/page', function (req, res) {
  res.send('Page!');
});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT_NUMBER, function () {
  console.log('Example app listening on port '+ process.env.PORT_NUMBER+'!');
});

