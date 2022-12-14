var express = require('express');
var router = express.Router();
var db = require('../utils/db');

router.get('/', function(req, res, next) {
  if (req.query.fail) {
    res.render('createAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." });
} else {
    res.render('createAccount', { msg: null });
}
})

router.post('/', async function(req, res, next) {

  const body = req.body;

  try{
    if (body.userRole === '2') {
      await db.createProfessorAccount(body);
      res.render('accountProfessorCreated', { });
    }
    if (body.userRole === '3') {
      await db.createAdminAccount(body);
      res.render('accountAdminCreated', { });
    }
  } catch (error) {
    console.error(error);
    res.render('createAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." } );
  }
}) 

module.exports = router;