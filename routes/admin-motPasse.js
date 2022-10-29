var express = require('express');
var router = express.Router();
var db = require('../utils/db');

router.get('/', function(req, res, next) {
  req.user.user_id;
  res.render('admin-motPasse', { });
});

router.post('/', function(req, res, next) {
  userId = req.user.user_id;
  newPassword = req.body.password;

  try {
    db.changerPassword(userId, newPassword);
    res.render('admin-motPasse', {status: 'success', msg: 'Vous avez réussi de changer de mot de passe.'});
  } catch (error) {
    res.render('admin-motPasse', { status: 'fail', msg: "Error"});
  }

})

module.exports = router;
