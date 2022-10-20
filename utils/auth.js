const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const { connect } = require('../routes');

module.exports = function(passport) {

    // const users = [{
    //     _id: 1,
    //     username: 'adm',
    //     password: '$2a$12$0Huh0AE8LPL8wuOyqtXEtOP21y3oFJtaD5JqyvK/o0aWznnMcK6zy',
    //     email: 'teste@grasset.com'
    // }]

    // function findUser(username) {
    //     return users.find(item => item.username === username);
    // }

    // function findUserById(id) {
    //     return users.find(item => item._id === id);
    // }

    // async function validCredentials(username, password) {
    //     const conn = await connect();
    //     const sql = "SELECT user_password FROM users WHERE user_id = ? AND user_active = 1";
    //     const rows = await conn.query(sql, [username]);

    //     if (rows.length == 1) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    async function findUser(username) {
        const db = require('../utils/db');
        const conn = await db.connect();
        const sql = "SELECT user_id, user_role, user_active, user_password FROM users WHERE user_id = ? AND user_active = 1";
        const rows = await conn.query(sql, [username]);
        
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    }

    passport.serializeUser((user, done) => {
        done(null, user.user_id)
    })

    passport.deserializeUser(async (username, done) => {
        try {
            const db = require('../utils/db');
            const user = await findUser(username);
            done(null, user);
        } catch(err) {
            console.log(err);
            return done(err, null);
        }
    })

    passport.use('local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const db = require('../utils/db');
            const user = await findUser(username);
            if (!user) return done(null, false);

            const valid = bcrypt.compareSync(password, user.user_password);
            if (!valid) return done(null, false);
            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    }));
}
