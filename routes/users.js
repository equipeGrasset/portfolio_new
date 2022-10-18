var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

module.exports = router;
