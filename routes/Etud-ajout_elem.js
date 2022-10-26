var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  res.render('Etud-ajout_elem', { 
    user: req.user.user_id,
    title: 'Express'
  });
});

module.exports = router;
router.post("/ajout_elem", (req, res) => {
  let id = req.body.id 
  let  = req.body.name;
  let portfolioId = req.body.portfolioId;
  let url = req.body.url; 
  let description = req.body.description; 


  let reqSql =
    id === null
      ? "INSERT INTO `projects`(`project_id`, `project_name`, `project_description`, `portfolio_id`, `project_url`, `project_active`) VALUES(?, ?, ?, ?, ?, ?)"
      : "UPDATE notes SET titre = ?, description = ? WHERE id = ?";

  let donnees =
    id === null ? [1, name, description, 5232, url, 1] : [titre, description, id];

  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(reqSql, donnees, (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
          res.status(500).render("erreur", { erreur });
        } else {
          res.status(300).redirect("/");
        }
      });
    }
  });
});
