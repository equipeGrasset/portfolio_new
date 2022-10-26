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
    await db.createAccount(body);
    res.render('accountCreated', { });
  } catch (error) {
    console.error(error);
    res.render('createAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." } );
  }
}) 

module.exports = router;