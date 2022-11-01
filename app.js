var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
require('./utils/auth')(passport);
const mariadb = require('mariadb');
const mysql = require("mysql");


const optionBd = {
  host: "23.235.197.135",
  user: "instit43_portfolio_adm_test",
  password: "daAmbF_TPagrass3t",
  port: 3306,
  database: "instit43_portfolio_test",
};





//exp1
const myConnection = require("express-myconnection");

function authenticationMiddleware (req, res, next) {
  if (req.isAuthenticated()) { 
    return next();
  } else {
    res.redirect('/login');
  }
}





 

//page principale

var portfolio_vistuer = require('./routes/portfolio-vistuer');     
var indexRouter = require('./routes/index');
var indexPartenaire = require('./routes/indexPartenaire');

//Login
var usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const passwordChangedRouter = require('./routes/passwordChanged');
const forgottenPasswordRouter = require('./routes/forgottenPassword');

//creation account
const createStudentAccountRouter = require('./routes/createStudentAccount'); 
const accountStudentCreatedRouter = require('./routes/accountStudentCreated');
const createAccountRouter = require('./routes/createAccount');
const accountAdminCreatedRouter = require('./routes/accountAdminCreated');
const accountProfessorCreatedRouter = require('./routes/accountProfessorCreated');


//Etudiant
var Etud_portfolio = require('./routes/Etud-portfolio');
var Etud_Mprofil = require('./routes/Etud-Mprofil');
var Etud_motPasse = require('./routes/Etud-motPasse');
var Etud_liste_elem = require('./routes/Etud-liste_elem');
var Etud_ajout_elem = require('./routes/Etud-ajout_elem');
var Etud_modifier_elem = require('./routes/Etud-modifier_elem');

//Admin
var admin_Mprofil = require('./routes/admin-Mprofil');
var admin_motPasse = require('./routes/admin-motPasse');
var admin_lise_Etud = require('./routes/admin-lise_Etud');
var adminLiseAdmins = require('./routes/admin-lise_admins'); 
var admin_Lise_Ensg = require('./routes/admin-lise_Ensg');
var admin_lise_EtudATT = require('./routes/admin-lise_EtudATT'); 
var admin_liste_elem = require('./routes/admin-liste_elem');

//Enseignant
var Ensg_lise_Etud = require('./routes/Ensg-lise_Etud');
var Ensg_Mprofil = require('./routes/Ensg-Mprofil');
var Ensg_motPasse = require('./routes/Ensg-motPasse');


var app = express();

//Définition du middleware pur connexion avec la bd
app.use(myConnection(mysql, optionBd, "pool"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname + '/public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 30 * 60 * 1000}
}))
app.use(passport.initialize());
app.use(passport.session());


//Login
app.use('/forgottenPassword', forgottenPasswordRouter);
app.use('/passwordChanged', passwordChangedRouter);
app.use('/login', loginRouter);
app.use('/logout', authenticationMiddleware, logoutRouter);
app.use('/users', authenticationMiddleware, usersRouter);

//create account
app.use('/accountStudentCreated', accountStudentCreatedRouter);
app.use('/createStudentAccount', createStudentAccountRouter);
app.use('/accountAdminCreated', accountAdminCreatedRouter);
app.use('/accountProfessorCreated', accountProfessorCreatedRouter);
app.use('/accountStudentCreated', accountStudentCreatedRouter);
app.use('/createAccount', authenticationMiddleware, createAccountRouter);


//index portfolio
app.use('/',  indexRouter);
app.use('/portfolio-vistuer', portfolio_vistuer);
app.use('/indexPartenaire',  indexPartenaire);

//ADmin
app.use('/admin-Mprofil', authenticationMiddleware, admin_Mprofil);
app.use('/admin-motPasse', authenticationMiddleware, admin_motPasse); 
app.use('/admin-lise_EtudATT', authenticationMiddleware, admin_lise_EtudATT); 
app.use('/admin-lise_EtudATT/*', authenticationMiddleware, admin_lise_EtudATT); 
app.use('/admin-lise_Etud', authenticationMiddleware, admin_lise_Etud);
app.use('/admin-lise_Etud/*', authenticationMiddleware, admin_lise_Etud);
app.use('/admin-lise_Ensg', authenticationMiddleware, admin_Lise_Ensg); 
app.use('/admin-lise_admins', authenticationMiddleware, adminLiseAdmins);
app.use('/admin-liste_elem', authenticationMiddleware, admin_liste_elem);

//Enseignant
app.use('/Ensg-lise_Etud', authenticationMiddleware, Ensg_lise_Etud); 
app.use('/Ensg-Mprofil', authenticationMiddleware, Ensg_Mprofil); 
app.use('/Ensg-motPasse', authenticationMiddleware, Ensg_motPasse); 


//Etudaint
app.use('/Etud-portfolio', authenticationMiddleware, Etud_portfolio);
app.use('/Etud-Mprofil', authenticationMiddleware, Etud_Mprofil);
app.use('/Etud-motPasse', authenticationMiddleware, Etud_motPasse);
app.use('/Etud-liste_elem', authenticationMiddleware, Etud_liste_elem);
app.use('/Etud-ajout_elem', authenticationMiddleware, Etud_ajout_elem);
app.use('/Etud-modifier_elem', authenticationMiddleware, Etud_modifier_elem);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
