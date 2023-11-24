var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.send("Express server")
})

module.exports = router;