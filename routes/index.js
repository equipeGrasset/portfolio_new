var express = require('express');
var router = express.Router();

var db = require('../utils/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const resultat = await db.findAllStudentsTagged();
    res.status(200).render("index", { resultat });
  } catch (error) {
    res.status(500).render("erreur", { error });
  }
});

module.exports = router;
