var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 
  req.getConnection((erreur, connection) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).render("erreur", { erreur });
    } else {
      connection.query("SELECT * FROM students ", [], (erreur, resultat) => {
        if (erreur) {
          console.log(erreur);
        } else {
          res.status(200).render("index", { resultat });
          console.log(resultat)
        }
      });
    }
  });

});


module.exports = router;
