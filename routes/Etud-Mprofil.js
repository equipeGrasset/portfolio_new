 
var express = require('express');
var router = express.Router();
var db = require('../utils/db');

 
router.get('/', async function(req, res, next) {
  const user = req.user.user_id;
  student = await db.findStudent(user);
      res.render('Etud-Mprofil', {
        title: 'Étudiant' , usersurname: student.student_surname, username: student.student_name ,imagepath: student.student_photo, statutemp : student.student_employe_intern_status ,email : student.student_email,phone : student.student_telephone, bio:student.student_biography
        
      });
});


router.post('/', async function(req, res, next) {

  const body = req.body;
  const user = req.user.user_id;
  try{
    await db.MProfilETud(body,  user);
    res.render('Etud-Mprofil', { });
  } catch (error) {
    console.error(error);
    //res.render('createAccount', { msg: "Impossible de créer le compte. Veuillez contacter votre administrateur système." } );
  }
}) 


module.exports = router;

