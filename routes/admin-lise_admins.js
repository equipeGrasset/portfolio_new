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

router.delete('/:id', async function (req, res, next) {

  const userId = req.params.id;

  try {
    await db.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({
    routeRacine: "/admin-lise_admins"
  });
});

module.exports = router;
