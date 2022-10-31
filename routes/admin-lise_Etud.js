var express = require('express');
var router = express.Router();

var db = require('../utils/db');

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT * FROM students s INNER JOIN programs u ON s.`student_program` = u.program_id", [], (erreur, resultat) => {
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

router.delete('/:id', async function (req, res, next) {

  const userId = req.params.id;

  try {
    await db.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    routeRacine: "/admin-lise_Etud"
  });
});

router.post('/student/etat', async function(req, res, next) {
 
  const body = req.body;

  console.log("object", body);

  try {
    await db.tagStudent(body.userId, body.status);
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }

  res.send("Success");
});

router.post('/portfolio/etat', async function(req, res, next) {
 
  const body = req.body;

  console.log("object", body);

  try {
    await db.activateStudentPortfolio(body.userId, body.status);
  } catch (error) {
    res.status(500).render("erreur", { error });
  }

  res.send("Success");
});

module.exports = router;
   