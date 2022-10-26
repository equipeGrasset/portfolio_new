var express=require('express');
var router=express.Router();
var db = require('../utils/db');

router.get('/', function (req, res) {
    if (req.query.fail) {
        res.render('changerPassword', { msg: "Problème de changement de mot de passe. Veuillez réessayer." });
    } else {
        res.render('changerPassword', { msg: null });
    }
})

router.post('/', async function (req, res){
    const userId = req.userId;
    const body = req.body;

    try {
        await db.changerPassword(userId, body);
        res.render('messages', { msg: "Le mot de passe a été changé. Veuillez se connecter." });
    } catch (error) {
        console.error(error);
        res.render('changerPassword', { msg: "Problème de changement de mot de passe. Veuillez réessayer." });
    }
})

module.exports = router;