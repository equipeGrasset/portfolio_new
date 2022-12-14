const express = require('express');
const formidable = require('formidable');
const router = express.Router();

const file = require('../utils/uploadFile');
const db = require('../utils/db');

router.get('/', function(req, res, next) {
  res.render('Etud-ajout_elem', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

router.post("/", async (req, res) => {
  let form = new formidable.IncomingForm();

  await form.parse(req, async function (err, fields, files) {
    if (err) {
      console.error(error);
      res.status(500).render("erreur", { error });
    }

    try {
      const user = req.user.user_id;
      student = await db.findStudent(user);

      const fileInfo = await file.uploadFile(files, student.student_id);

      let { id, titre, url, description } = fields; 
    
      try {
        const result = await db.insertProject({ titre: titre, studentId: student.student_id, url: url, description: description });
        console.log("result", result.id);
        await db.insertFile({ name: fileInfo.name, path: fileInfo.path, projectId: result.id });
      } catch (error) {
        console.error(error);
        res.status(500).render("erreur", { error });
      }
    
      res.status(301).redirect("/Etud-liste_elem");
    } catch (error) {
      console.error(error);
      res.status(500).render("erreur", { error });
    }
  });
});

module.exports = router;
