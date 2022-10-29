var express = require('express');
var router = express.Router();

var db = require('../utils/db');

router.get('/', async function(req, res, next) {
  const userId = req.user.user_id;

  try {
    const professor = await db.findProfessor(userId);
    console.log("professor", professor);
    const resultat = await db.findAllStudentByProfessorId(professor.professor_id);

    res.status(200).render("Ensg-lise_Etud", { resultat });
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }
});

router.post('/student/etat', async function(req, res, next) {
 
  const body = req.body;

  try {
    await db.tagStudent(body.studentId, body.tagged);
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }

  res.send("Success");
});

module.exports = router;