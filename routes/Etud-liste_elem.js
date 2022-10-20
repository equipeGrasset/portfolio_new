var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  res.render('Etud-liste_elem', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

module.exports = router;
