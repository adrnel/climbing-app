var express = require('express');
var app = express();
var routes = require('./routes/index');
var api = require('./services/api');
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
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

app.listen(process.env.PORT || process.env.PORT_NUMBER || 3000, function () {
  console.log('Example app listening on port '+ (process.env.PORT || process.env.PORT_NUMBER || 3000)+'!');
});

