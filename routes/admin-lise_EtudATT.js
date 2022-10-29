var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/', function(req, res, next) {
 
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(`SELECT 
st.*
	FROM 
		users as us 
		inner JOIN students as st ON st.student_DA = us.user_id 
	WHERE 
		us.user_active = 0
		AND us.user_role = 1`, [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("admin-lise_EtudATT", { resultat });
          console.log(resultat)
        }
      });
    }
  });
});

router.post('/student/etat', async function(req, res, next) {
 
  const body = req.body;
  const studentRole = 1;

  try {
    await db.activateUser(body.userId, body.status, studentRole);
  } catch (error) {
    res.status(500).render("erreur", { error });
  }

  res.send("Success");
});

module.exports = router;

