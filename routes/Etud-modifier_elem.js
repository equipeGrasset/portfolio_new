const express = require('express');
const formidable = require('formidable');
const router = express.Router();

const file = require('../utils/uploadFile');
const db = require('../utils/db');

router.get('/:id', async function(req, res, next) {

  const projectId = req.params.id;
  project = await db.findProject(projectId);

  res.render('Etud-modifier_elem', { 
    user: req.user.user_id,
    projectId: project.project_id,
    titre: project.project_name,
    url: project.project_url,
    description: project.project_description,
    fileId: project.file_id,
    fileName: project.file_name,
    filePath: project.file_path,
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

      let { id, titre, url, description, fileId, fileName } = fields;

      await file.removeFile(fileName, student.student_id);
      const fileInfo = await file.uploadFile(files, student.student_id);
    
      try {
        await db.updateProject({ id: id, titre: titre, url: url, description: description });
        await db.updateFile({ id: fileId, name: fileInfo.name, path: fileInfo.path});
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
