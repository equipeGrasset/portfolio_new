var express = require('express');
const db = require('../utils/db');
var router = express.Router();

router.get('/', async function(req, res, next) {

    if (req.user.user_role === 1){
      student = await db.findStudent(req.user.user_id);
      res.render('students', {
        title: 'Étudiant' , usersurname: student.student_surname, username: student.student_name
      });
    }

    if (req.user.user_role === 2){
      professor = await db.findProfessor(req.user.user_id);
      res.render('profs', {
        title: 'Enseignants' , usersurname: professor.professor_surname, username: professor.professor_name
      });
    }

    if (req.user.user_role === 3){
      admin = await db.findAdmin(req.user.user_id);
      res.render('admins', {
        title: 'Admins' , usersurname: admin.administrator_surname, username: admin.administrator_name
      });
    }
});

module.exports = router;
