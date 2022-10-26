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

//Etudiant
async function MProfilETud(body,user) {

    const {name, surname, satutemp, pathimg, email, bio, phone} = body;
  
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);
 
        await ModifierProfilETud(conn, user, name, surname, null, "images/"+pathimg, email, bio, phone);

        await doCommit(conn);

        await enableAutoCommit(conn);
    } catch (error) {
        console.error(error);
        throw error;
    } 
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

    const selectStudentSql = "SELECT s.student_name, s.student_surname, s.student_id, s.student_employe_intern_status,s.student_biography, s.student_email, s.student_telephone, s.student_photo, u.user_id FROM students s INNER JOIN users u ON s.student_DA = u.user_id WHERE user_id = ?";
    const rows = await conn.query(selectStudentSql, [username]);

    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}
async function StudentID(username) {

    const conn = await connect();

    const selectStudentSql = "SELECT s.student_id, u.user_id FROM students s INNER JOIN users u ON s.student_DA = u.user_id WHERE user_id = ?";
    const rows = await conn.query(selectStudentSql, [username]);

    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}
async function findproject(studentId) {

    const conn = await connect();

    const selectStudentSql = "SELECT s.student_name,s.student_surname,s.student_photo,s.student_email,s.student_employe_intern_status, s.student_biography, u.project_id , u.project_name, u.project_description , u.project_url FROM students s INNER JOIN projects u ON s.student_id = u.proj_stud_id WHERE student_id = ?";
    const rows = await conn.query(selectStudentSql, [studentId]);

    
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

async function createAccount(body) {

    const {userId, password, name, surname, programmes, questionSecrete_1, questionSecrete_2} = body;
    const user_password = bcrypt.hashSync(password, 12);
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);

        await createUser(conn, userId, user_password, questionSecrete_1, questionSecrete_2);
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

//Enseignant

async function MprofilEnsg(body,user) {

    const {userId, name, Prenom, email, phone} = body;
  
    
    const conn = await connect();
    
    try {
        await disableAutoCommit(conn);
 
        await ModifierProfilEnsg(conn, user, name, Prenom, email, phone);

        await doCommit(conn);

        await enableAutoCommit(conn);
    } catch (error) {
        console.error(error);
        throw error;
    } 
}

//ADmin

    async function MProfilAdmin(body,user) {

        const {userId, name, Prenom, email, phone} = body;
       
        const conn = await connect();
        
        try {
            await disableAutoCommit(conn);
     
            await ModifierProfilAdmin(conn, user, name, Prenom, email, phone);
    
            await doCommit(conn);
    
            await enableAutoCommit(conn);
        } catch (error) {
            console.error(error);
            throw error;
        } 
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

async function createUser(conn, userId, user_password, questionSecrete_1, questionSecrete_2) {
    const insertUserSql = "INSERT INTO users (user_id,user_password,user_role,user_active,user_qea_1,user_qea_2) VALUES (?,?,?,?,?,?)";
    await conn.query(insertUserSql, [userId, user_password, 1, 0, questionSecrete_1, questionSecrete_2]);
}
 


async function createStudent(conn, userId, name, surname, programmes) {
    const insertStudentSql = "INSERT INTO students (student_DA, student_name, student_surname, student_program, student_id) VALUES (?,?,?,?,LAST_INSERT_ID())";
    await conn.query(insertStudentSql, [userId, name, surname, programmes]);
}

//Etudiant
async function ModifierProfilETud(conn, userId, name, surname, satutemp, pathimg, email, bio, phone) {
    const insertStudentSql = "UPDATE students SET student_name = ? ,student_surname = ? ,student_employe_intern_status = ?, student_photo = ? , student_email = ?, student_biography = ? ,student_telephone = ? WHERE student_DA = ? ";
    await conn.query(insertStudentSql, [name, surname, satutemp, pathimg, email, bio, phone, userId]);
}



//Etudiant

async function findStudentProfil(user) {

    const conn = await connect();

    const selectStudentSql = "SELECT  student_employe_intern_status, student_photo FROM students WHERE student_DA = ? ";
    const rows = await conn.query(selectStudentSql, [user]);

    
    if (rows.length > 0) {
        return rows[0];
    } else {
        return null;
    }
}


//Enseignant
async function ModifierProfilEnsg(conn, userId, name, surname, email,phone) {
    const insertStudentSql = "UPDATE professors SET professor_name= ?, professor_surname= ?, professor_email= ? ,professor_telephone= ? WHERE employee_number = ?";
    await conn.query(insertStudentSql, [name, surname, email, phone, userId]);
}

//Admin
async function ModifierProfilAdmin(conn, userId, name, surname, email,phone) {
    const insertStudentSql = "UPDATE administrators SET administrator_name = ?,administrator_surname= ?, administrator_email = ? ,administrator_telephone= ? WHERE employee_number =  ?";
    await conn.query(insertStudentSql, [name, surname, email, phone, userId]);
}



async function createProfessor(conn, userId, name, surname, programmes) {
    const insertStudentSql = "INSERT INTO professor (numero_employee, student_name, student_surname, student_program, student_id) VALUES (?,?,?,?,LAST_INSERT_ID())";
    await conn.query(insertStudentSql, [userId, name, surname, programmes]);
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

module.exports = { connect,MProfilAdmin,StudentID,findproject , MProfilETud, MprofilEnsg, findStudentProfil, createAccount, findAdmin, findProfessor, findStudent, validerCredentials }
