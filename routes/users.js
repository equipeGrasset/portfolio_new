var express = require('express');
const db = require('../utils/db');
var router = express.Router();

router.get('/', async function(req, res, next) {
   
    if (req.user.user_role === 1){
      student = await db.findStudent(req.user.user_id);
      res.render('Etud-Mprofil', {
        title: 'Étudiant' , usersurname: student.student_surname, username: student.student_name ,imagepath: student.student_photo, statutemp : student.student_employe_intern_status ,email : student.student_email, phone : student.student_email , bio : student.student_biography
      });
    }

    if (req.user.user_role === 2){
      professor = await db.findProfessor(req.user.user_id);
      res.render('Ensg-Mprofil', {
        title: 'Enseignants' , usersurname: professor.professor_surname, username: professor.professor_name, email:professor.professor_email, phone: professor.professor_telephone
        
      });
  
    } 
    if (req.user.user_role === 3){
      admin = await db.findAdmin(req.user.user_id);
      res.render('admin-Mprofil', {
        title: 'Admins' , usersurname: admin.administrator_surname, username: admin.administrator_name, email: admin.administrator_email, phone: admin.administrator_telephone
      });
    }
});

module.exports = router;
