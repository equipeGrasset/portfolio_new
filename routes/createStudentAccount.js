var express = require('express');
var router = express.Router();
var db = require('../utils/db');

router.get('/', function(req, res, next) {
  if (req.query.fail) {
    res.render('createStudentAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." });
} else {
    res.render('createStudentAccount', { msg: null });
}
})

router.post('/', async function(req, res, next) {

  const body = req.body;

  try{
    await db.createStudentAccount(body);
    res.render('accountStudentCreated', { });
  } catch (error) {
    console.error(error);
    res.render('createStudentAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." } );
  }
}) 

module.exports = router;