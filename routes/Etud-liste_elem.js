
var express = require('express');
var router = express.Router();

const db = require('../utils/db');
 
 
router.get('/', async function(req, res, next) {
  const user = req.user.user_id;

  stu = await db.StudentID(user);
  id =  stu.student_id

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT project_id, project_name, project_description, project_url, project_active, proj_stud_id FROM projects WHERE proj_stud_id = ?  ", [id], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("Etud-liste_elem", { resultat });
          console.log(resultat + "-->" +id)
        }
      });
    }
  });
  
  });
 
module.exports = router; 
