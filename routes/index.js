var express = require('express');
var router = express.Router();

router.get('/',function(req,res){

    console.log("index.js function");

     res.sendFile('login.html', {root: './dist'});

});

module.exports = router;