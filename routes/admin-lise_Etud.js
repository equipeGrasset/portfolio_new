var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT s.student_name, s.student_surname,s.student_DA, u.program_name FROM students s INNER JOIN programs u ON s.`student_program` = u.program_id", [], (erreur, resultat) => {
    
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("admin-lise_Etud", { resultat });
          console.log(resultat)
        }
      });
    }
  });
  
});

module.exports = router;
   