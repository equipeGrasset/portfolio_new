var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  res.render('admin-Mprofil', { 
    user: req.user.user_id,
    title: 'Express'
    
  });
  console.console.log(user + " /" +title);
});

module.exports = router;
