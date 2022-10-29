const express = require('express');
const router = express.Router();

const db = require('../utils/db');

router.get('/', async function(req, res, next) {
  const userId = req.user.user_id;

  student = await db.findStudent(userId);

  projects = await db.findAllProjectsByStudentId(student.student_id);
  student.projects = projects;

  res.status(200).render('Etud-portfolio', {
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
