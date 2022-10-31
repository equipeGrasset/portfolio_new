var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/', async function(req, res, next) {
  const user = req.user.user_id;
  student = await db.findStudent(user);

  console.info("student", student);

  res.render('Etud-Mprofil', {
    title: 'Étudiant',
    usersurname: student.student_surname,
    username: student.student_name,
    imagepath: student.student_photo,
    statusEmp: student.student_employe_intern_status,
    email: student.student_email,
    phone: student.student_telephone,
    bio: student.student_biography
  });
});

router.post('/', async function(req, res, next) {
  const body = req.body;
  const user = req.user.user_id;

  const { name, surname, statusEmp, avatarImg, email, bio, phone } = body;

  try {
    await db.MProfilETud(name, surname, statusEmp, avatarImg, email, bio, phone,  user);
    res.status(301).redirect('Etud-portfolio');
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }
})

router.post('/disable', async function(req, res, next) {

  const userId = req.user.user_id;
  const studentRole = 1;

  console.log("Disabling student: disable", userId);

  try {
    await db.activateUser(userId, false, studentRole);
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }

  res.status(200).send("Success");
}) 

module.exports = router;
