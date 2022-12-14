const express = require('express');
const router = express.Router();

const db = require('../utils/db');

router.get('/', async function(req, res, next) {
  const user = req.user.user_id;

  try {
    student = await db.findStudent(user);
    resultat = await db.findAllProjectsByStudentId(student.student_id);
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }

  res.status(200).render("Etud-liste_elem", { resultat });
});

router.delete('/:id', async function (req, res, next) {

  const projectId = req.params.id;

  try {
    await db.deleteProject(projectId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    routeRacine: "/Etud-liste_elem"
  });
});
 
module.exports = router; 
