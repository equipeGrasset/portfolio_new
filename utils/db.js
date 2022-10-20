const bcrypt = require('bcryptjs');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    const mariadb = require('mariadb');
    //const stringConnection = "mariadb://23.235.197.135:daAmbF_TPagrass3t@institutgrassetinfo.com:3306/instit43_portfolio_test";
    const stringConnection = "mariadb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + '@'
                                          + process.env.DB_HOST + ':' + process.env.DB_PORT + '/'
                                          + process.env.DB_DATA
    const connection = await mariadb.createConnection(stringConnection);
    console.log("Connected to the database...");
    global.connection = connection;
    return connection;
}

async function findAdmin(username) {
    const conn = await connect();
    const sql1 = "SELECT a.administrator_name, a.administrator_surname, u.user_id FROM administrators a INNER JOIN users u ON a.employee_number = u.user_id WHERE user_id = ?"
    const rows = await conn.query(sql1, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function findProfessor(username) {
    const conn = await connect();
    const sql1 = "SELECT p.professor_name, p.professor_surname , u.user_id FROM professors p INNER JOIN users u ON p.employee_number = u.user_id WHERE user_id = ?"
    const rows = await conn.query(sql1, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function findStudent(username) {
    const conn = await connect();
    const sql1 = "SELECT s.student_name, s.student_surname, u.user_id FROM students s INNER JOIN users u ON s.student_DA = u.user_id WHERE user_id = ?"
    const rows = await conn.query(sql1, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function createUserStudent(username, password, name, surname, qea1, qea2, cb) {
    const user_password = bcrypt.hashSync(password, 12);
    sql1 = "INSERT INTO users (user_id,user_password,user_role,user_active,user_qea_1,user_qea_2) " + 
	      "VALUES (?,?,1,0,?,?);"
    global.db.collection("users").insert({username, password: user_password, qea1, qea2}, 
        function(err, res) {
            cb(err, result)
        })
}

module.exports = { connect, createUserStudent, findAdmin, findProfessor, findStudent }
