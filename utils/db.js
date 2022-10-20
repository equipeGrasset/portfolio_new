const bcrypt = require('bcryptjs');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mariadb = require('mariadb');
    const stringConnection = "mariadb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + '@'
                                          + process.env.DB_HOST + ':' + process.env.DB_PORT + '/'
                                          + process.env.DB_DATA
    const connection = await mariadb.createConnection(stringConnection);
    console.log("Connected to the database...");
    global.connection = connection;
    return connection;
}

async function createUserStudent(username, password, name, surname, qea1, qea2, cb) {
    const user_password = bcrypt.hashSync(password, 10);
    sql1 = "INSERT INTO users (user_id,user_password,user_role,user_active,user_qea_1,user_qea_2) " + 
	      "VALUES (?,?,1,0,?,?);"
    global.db.collection("users").insert({username, password: user_password, qea1, qea2}, 
        function(err, res) {
            cb(err, result)
        })
}

module.exports = { connect, createUserStudent }
