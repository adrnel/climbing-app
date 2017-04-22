var express = require('express');
var router = express.Router();

router.get('/',function(req, res){

    console.log("login");

    res.sendFile('login.html', {root: './dist'});

});

router.get('/home.html',function(req, res){

    console.log("home");
    if(req.session.user) {
        res.sendFile('home.html', {root: './dist'});
    } else {
        res.sendFile('login.html', {root: './dist'});
    }
});


module.exports = router;