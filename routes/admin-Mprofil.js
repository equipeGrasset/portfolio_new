var express = require('express');
var router = express.Router();
var db = require('../utils/db');

/* GET portfolio etudinat listing. */


  router.get('/',async function(req, res, next) {
    admin = await db.findAdmin(req.user.user_id);
    res.render('admin-Mprofil', {
      title: 'Admins' , usersurname: admin.administrator_surname, username: admin.administrator_name, email: admin.administrator_email, phone: admin.administrator_telephone
    });
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
