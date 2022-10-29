var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('accountCreated');
})

module.exports = router;