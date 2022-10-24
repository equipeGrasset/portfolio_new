var express=require('express');
var router=express.Router();
var db = require('../utils/db');

router.get('/', function (req, res) {
    if (req.query.fail) {
        res.render('forgottenPassword', { msg: "Impossible de récuperer le mot de passe. Veuillez réessayer ou contacter l'administrateur système." });
    } else {
        res.render('forgottenPassword', { msg: null });
    }
})

router.post('/', async function (req, res){

    const body = req.body;

    try {
        valid = await db.validerCredentials(body);
        if (valid) {
            res.render('passwordChanged', { newPassword: newPassword });
        } else {
            res.render('forgottenPassword', { msg: "Une erreur s'est produit. Veuillez réessayer ou contacter l'administrateur système." });
        }
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;