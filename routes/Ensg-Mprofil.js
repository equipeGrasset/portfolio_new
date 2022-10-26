var express = require('express');
var router = express.Router();
var db = require('../utils/db');

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  res.render('Ensg-Mprofil', { 
 
   
  });
});

 
router.post('/', async function(req, res, next) {

  const body = req.body;
  const user = req.user.user_id;
  try{
    await db.MprofilEnsg(body,  user);
    res.render('Ensg-Mprofil', { });
  } catch (error) {
    console.error(error);
    //res.render('createAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." } );
  }
}) 

module.exports = router;

 
 
 