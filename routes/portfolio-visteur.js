
var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/:id', function(req, res, next) {
 
  const id = req.params.id;
  console.log("--> "+String(id))


req.getConnection((erreur, connection) => {
  if (erreur) {
    console.log(erreur);
  } else {
    connection.query("SELECT s.student_name, s.student_surname, s.student_employe_intern_status, s.student_photo, s.student_email, s.student_telephone, s.student_biography, p.project_id, p.project_name, p.project_description, p.project_url, f.file_time_created, f.file_name, f.file_path FROM students s JOIN projects p ON s.student_id = p.proj_stud_id JOIN files f ON p.project_id  = f.project_id WHERE s.student_id = ?", [id], (erreur, resultat) => {
      if (erreur) {
        console.log(erreur);
        
      } else {

        if(resultat == 0){ 
          res.render('index', {resultat});
        }
        else{
        res.status(200).render("portfolio-visteur", { resultat });
        console.log(resultat)
      }
      }
    });
  }
});
}); 


 
module.exports = router;
 