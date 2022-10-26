var express = require('express');
var router = express.Router();

const db = require('../utils/db');
 
/* GET portfolio etudinat listing. */
router.get('/', async function(req, res, next) {
  
  
  const user = req.user.user_id;

  stu = await db.StudentID(user);
  id =  stu.student_id
 // console.log("-->"+stu+user+"= "+String(id))


  student = await db.findproject(id);
      res.render('Etud-portfolio', {
        title: 'Étudiant' , usersurname: student.student_surname, username: student.student_name ,imagepath: student.student_photo, statutemp : student.student_employe_intern_status ,email : student.student_email,phone : student.student_telephone, bio:student.student_biography, projectName : student.project_name,projectID: student.project_id , projectName : student.project_name, projectDesc : student.project_description ,projectUrl: student.project_url
        
      });
});

 
module.exports = router; 
