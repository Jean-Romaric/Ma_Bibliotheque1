//(1)
const mysql = require('mysql2');//importes le module 'mysql2'.
// Crée une connexion à la base de données
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,                   //.createConnection({...})C’est une méthode du module mysql2.
  user: process.env.DB_USER,
  password: process.env.DB_PASS,       
  database: process.env.DB_NAME 
});

// Connexion à la base
db.connect((err) => {  //connect() C’est une  méthode de l’objet db (créé avec mysql.createConnection(...))
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = db;
