const express = require('express'); 
const router = express.Router();

const db = require('../utils/db');
 

router.get('/:id', async function(req, res, next) {

  const id = req.params.id;

  console.log(id+'-->'+id)
  project = await db.findProject(id);

  res.render('Elemnt_portfolio', { 
     
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
  res.render("Elemnt_portfolio")
});


module.exports = router;
