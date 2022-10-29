const express = require('express');
const router = express.Router();

const db = require('../utils/db');

router.get('/', function(req, res, next) {
  res.render('Etud-ajout_elem', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

router.post("/", async (req, res) => {
  let { id, titre, url, description } = req.body; 

  const user = req.user.user_id;
  student = await db.findStudent(user);

  try {
    if (!id || id === null) {
      console.info("create new project");
      await db.insertProject({ titre: titre, studentId: student.student_id, url: url, description: description });
    } else {
      console.info("update new project ", id);
      await db.updateProject({ id: id, titre: titre, description: description });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("erreur", { error });
  }

  res.status(301).redirect("/Etud-liste_elem");
});

module.exports = router;
