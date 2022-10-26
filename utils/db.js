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

async function findAdmin(username) {

    const conn = await connect();

    const selectAdminSql = "SELECT a.administrator_name, a.administrator_surname, u.user_id FROM administrators a INNER JOIN users u ON a.employee_number = u.user_id WHERE user_id = ?";
    const rows = await conn.query(selectAdminSql, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function findProfessor(username) {

    const conn = await connect();

    const selectProfessorSql = "SELECT p.professor_name, p.professor_surname , u.user_id FROM professors p INNER JOIN users u ON p.employee_number = u.user_id WHERE user_id = ?";
    const rows = await conn.query(selectProfessorSql, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function findStudent(username) {

    const conn = await connect();

    const selectStudentSql = "SELECT s.student_name, s.student_surname, u.user_id FROM students s INNER JOIN users u ON s.student_DA = u.user_id WHERE user_id = ?";
    const rows = await conn.query(selectStudentSql, [username]);
    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}

async function updatePassword(conn, userId, newPassword) {
    const updatePasswordSql = "UPDATE users SET user_password = ? WHERE user_id = ?";
    await conn.query(updatePasswordSql, [newPassword, userId]);
}

async function createAdminAccount(body) {

    const {userId, password, userRole, name, surname, telephone, email, questionSecrete_1, questionSecrete_2} = body;
    const user_password = bcrypt.hashSync(password, 12);
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);

        await createUser(conn, userId, user_password, userRole, questionSecrete_1, questionSecrete_2);
        await createAdmin(conn, userId, name, surname, telephone, email);

        await doCommit(conn);

        await enableAutoCommit(conn);
    } catch (error) {
        console.error(error);
        throw error;
    } 
    // finally {
    //     conn.close();
    // }
}

async function createStudentAccount(body) {

    const {userId, password, userRole, name, surname, programmes, questionSecrete_1, questionSecrete_2} = body;
    const user_password = bcrypt.hashSync(password, 12);
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);

        await createUser(conn, userId, user_password, userRole, questionSecrete_1, questionSecrete_2);
        await createStudent(conn, userId, name, surname, programmes);

        await doCommit(conn);

        await enableAutoCommit(conn);
    } catch (error) {
        console.error(error);
        throw error;
    } 
    // finally {
    //     conn.close();
    // }
}

async function createProfessorAccount(body) {

    const {userId, password, userRole, name, surname, telephone, email, questionSecrete_1, questionSecrete_2} = body;
    const programmes = [body.programmes];
    const user_password = bcrypt.hashSync(password, 12);
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);

        await createUser(conn, userId, user_password, userRole, questionSecrete_1, questionSecrete_2);
        await createProfessor(conn, userId, name, surname, telephone, email);

        await createProgramProfessor(conn, programmes, userId);

        await doCommit(conn);

        await enableAutoCommit(conn);
    } catch (error) {
        console.error(error);
        throw error;
    } 
    // finally {
    //     conn.close();
    // }
}

async function disableAutoCommit(conn) {
    await conn.query("SET autocommit = 0");
    console.log("Autocommit off");
}

async function doCommit(conn) {
    await conn.query("COMMIT");
    console.log("Commit done!");
}

async function enableAutoCommit(conn) {
    await conn.query("SET autocommit = 1");
    console.log("Autocommit on");
}

async function createUser(conn, userId, user_password, userRole, questionSecrete_1, questionSecrete_2) {
    const insertUserSql = "INSERT INTO users (user_id,user_password,user_role,user_active,user_qea_1,user_qea_2) VALUES (?,?,?,?,?,?)";
    //si la création d'utilisatquer vienne de la route createStudentAccount
    if (userRole === undefined) {
        await conn.query(insertUserSql, [userId, user_password, 1, 0, questionSecrete_1, questionSecrete_2]);
    //sinon vienne de les routes createProfessorAccount ou createAdminAccount
    } else {
        await conn.query(insertUserSql, [userId, user_password, userRole, 1, questionSecrete_1, questionSecrete_2]);
    } 
}

async function createStudent(conn, userId, name, surname, programmes) {
    const insertStudentSql = "INSERT INTO students (student_DA, student_name, student_surname, student_program, student_id) VALUES (?,?,?,?,LAST_INSERT_ID())";
    await conn.query(insertStudentSql, [userId, name, surname, programmes]);
}

async function createProfessor(conn, userId, name, surname, telephone, email) {
    const insertProfessorSql = "INSERT INTO professors (employee_number, professor_name, professor_surname, professor_telephone, professor_email, professor_id) VALUES (?,?,?,?,?,LAST_INSERT_ID())";
    await conn.query(insertProfessorSql, [userId, name, surname, telephone, email]);
}

async function createAdmin(conn, userId, name, surname, telephone, email) {
    const insertAdminSql = "INSERT INTO administrators (employee_number, administrator_name, administrator_surname, administrator_telephone, administrator_email, administrator_id) VALUES (?,?,?,?,?,LAST_INSERT_ID())";
    await conn.query(insertAdminSql, [userId, name, surname, telephone, email]);
}

async function createProgramProfessor(conn, programmes, userId) {
    //J'ai crée une array d'objets avec une fonction qui va ajouter des items à la fin du array
    let arrayValeurs = { addItem: function addItem(item){
                                [].push.call(this, item);
                            }
                        };
    // Cette variable recevra les valeurs qui seront placées en séquence pour une insertion multiple par la suite.
    let valueSql = '';
    // La requete poir trouver la dernière valeur de pp_id
    const maxPpIdSql = "SELECT MAX(pp_id) FROM programs_professors";
    const selectProfessorIdSql = "SELECT p.professor_id from professors p WHERE p.employee_number = ?";
    // Je prendre la dernière valeur de pp_id dans la base de données et j'ai mis dans la const maxId
    const maxId = await conn.query(maxPpIdSql, function (err, result) {
        if (err) throw err;
        if (result) throw new Error();
    })
    // Je prende l'objet que contient l'ID trouvé dans la constant maxId et je mets dans la variable lastId
    // Ça c'est un numéro
    let lastId = Object.values(maxId[0])[0];

    // La requete pour trouver le professorId avec la relation entre le numero_employee (userId)
    const professorId = await conn.query(selectProfessorIdSql, userId, function(err, result) {
        if (err) throw err;
        if (result) throw new Error();
    });
    // Dans l'objet professorId, je prends la valeur d'Id du professeur et mets dans la variable profId
    profId = professorId[0].professor_id;

    // Pour nourrir l'array avec de valeurs qu'on a à partir du front-end (l'objet programmes) on utilise une boucle
    for (let i = 0; i < programmes[0].length; i++) {
        // La variable progId reçoit la valeur de chaque programme que le professeur enseigne.
        progId = programmes[0][i];
        // La valeur de l'Id de chaque programme que l'enseignant enseigne et la clé primaire de cette table sont mises
        // dans le tableau comme un objet.
        arrayValeurs.addItem({program_id: progId, professor_id: profId, pp_id: ++lastId});
    }
    // J'ai créé un nouveau tableau vide, mais qui sera au format [(1,1,1), (2,2,2), (3,3,3)].
    let newArrayValues = [];
    // On utilise la boucle for pour ne trouver que les valeurs d'objets dedans le tableau arrayValeurs.
    for (let i = 0; i < arrayValeurs.length; i++) {
        valueSql = "(" + arrayValeurs[i].program_id + ", " + arrayValeurs[i].professor_id + ", " + arrayValeurs[i].pp_id + ")";
        newArrayValues.push(valueSql);
    }
    // J'ai pris le nouveau tableau et j'ai fait le toString pour montrer les valeurs dans le format (1, 4, 5),(11, 4, 6),(13, 4, 7)
    let insertValues = newArrayValues.toString();
    // Le format qu'on cherche c'est comme ça
    // Values: (1, 4, 5),(11, 4, 6),(13, 4, 7)
    console.log ("Values: " + insertValues);

    await conn.query(`INSERT INTO programs_professors(program_id, professor_id, pp_id) VALUES ${insertValues}`);
}

async function validerCredentials(body) {

    const {userId, questionSecrete_1, questionSecrete_2} = body;
    const conn = await connect();
    const selectCredentialsSql = "SELECT user_id, user_qea_1, user_qea_2  FROM users WHERE user_id = ? and user_qea_1 = ? and user_qea_2 = ? and user_active = 1";
    
    rows = await conn.query(selectCredentialsSql, [userId, questionSecrete_1, questionSecrete_2]);
    
    if (rows.length > 0) {

        var generatePassword = require('./mathRandomPassword');
        newPassword = generatePassword.generatePassword();
        changerPassword(userId, newPassword);

        return true;
    } else {

        return false;
    }
}

async function changerPassword(userId, newPassword) {
    const user_password = bcrypt.hashSync(newPassword, 12);

    const conn = await connect();

    try {
        await updatePassword(conn, userId, user_password);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = { connect, createAdminAccount, createProfessorAccount, createStudentAccount, findAdmin, findProfessor, findStudent, validerCredentials }
