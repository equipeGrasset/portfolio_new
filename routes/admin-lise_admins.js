var express = require('express');
var router = express.Router();

/* GET portfolio etudinat listing. */
router.get('/', function(req, res, next) {
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("select * from administrators", [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("admin-lise_admins", { resultat });
          console.log(resultat)
        }
      });
    }
  });
});

router.delete("/admin-lise_admins/:id", (req, res) => {
  let id = req.params.id;
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query(
        "DELETE FROM notes WHERE id = ?",
        [id],
        (erreur, resultat) => {
          if (erreur) {
            console.log(erreur);
            res.status(500).render("erreur", { erreur });
          } else {
            res.status(200).json({ routeRacine: "/" });
          }
        }
      );
    }
  });
});

module.exports = router;
