var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  res.render('Ensg-motPasse', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

module.exports = router;
