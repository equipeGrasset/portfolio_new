var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('studentCreateAccount', {}
  // { 
  //   user: req.user.user_id,
  //   title: 'Express'
  // }
  )
})

router.post('/', function(req, res, next) {
  if (req.query.fail) {
    res.render('studentCreateAccount', { msg: "Il y a un problème dans la création d'utilisateur." });
  } else {
    res.render('login', {} );
  }
}) 

module.exports = router;