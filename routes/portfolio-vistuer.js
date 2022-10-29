var express = require('express');
var router = express.Router();

const db = require('../utils/db');

router.get('/', async function(req, res, next) {
  res.status(200).render('portfolio-vistuer', {
      title: 'Étudiant',
      usersurname: "Morais",
      username: "Fabiano",
      imagepath: undefined,
      statutemp: 0,
      email: "asasasa",
      phone: "asasasa",
      bio: "lorem",
      projects: []
    });
});

router.get('/:user_id', async function(req, res, next) {
  const userId = req.params.user_id;

  console.log("userId", userId);

  student = await db.findStudent(userId);
 
  projects = await db.findAllProjectsByStudentId(student.student_id);
  student.projects = projects;

  res.status(200).render('portfolio-vistuer', {
    title: 'Étudiant',
    usersurname: student.student_surname,
    username: student.student_name,
    imagepath: student.student_photo,
    statutemp: student.student_employe_intern_status,
    email: student.student_email,
    phone: student.student_telephone,
    bio: student.student_biography,
    projects: student.projects
  });
});

module.exports = router;
