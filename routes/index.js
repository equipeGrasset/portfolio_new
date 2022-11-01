var express = require('express');
var router = express.Router();

var db = require('../utils/db');

/* GET home page. */
router.get('/', function(req, res, next) {
 
 
  var cle = 1

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(" SELECT s.student_name, s.student_surname, s.student_id, s.student_photo, u.program_name, u.program_id FROM students s INNER JOIN programs u ON s.student_program = u.program_id WHERE student_tagged = ?  ", [cle], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("index", { resultat });
          console.log(resultat)
        }
      });
    }
  });

});

// WHERE student_epingler = ?



module.exports = router;
