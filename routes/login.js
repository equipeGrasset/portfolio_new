const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function(req, res, next) {

    if (req.query.fail) {
        res.render('login', { msg: "Utilisateur et/ou mot de passe invalide."});
    } else {
        res.render('login', { msg: null });
    }
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login?fail=true'
}))

module.exports = router;