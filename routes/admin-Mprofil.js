var express = require('express');
var router = express.Router();
var db = require('../utils/db');

/* GET portfolio etudinat listing. */


  router.get('/', function(req, res, next) {
    if (req.query.fail) {
      res.render('admin-Mprofil', {});
  } else {
      res.render('admin-Mprofil', { msg: "Done" });
  }
  })

router.post('/', async function(req, res, next) {

const body = req.body;

const user = req.user.user_id;
try{
  await db.MProfilAdmin(body,user);
  res.render('admin-Mprofil', { msg: "Done" } ); 

} catch (error) {
  console.error(error);
  }
}) 

module.exports = router;
