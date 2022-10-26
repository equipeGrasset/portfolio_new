const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(400).send('Impossible de faire log out');
        } else {
            res.clearCookie('connect.sid'); 
            console.log("User "  + req.user.username + " logged out.");
            res.redirect('/login');
        }
      });
    } else {
      res.redirect('/login');
    }
})

module.exports = router;