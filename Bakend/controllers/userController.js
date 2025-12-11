//(2)
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const JWT_SECRET = process.env.JWT_SECRET; // tu peux changer cette valeur
// controllers/userController.js
const userModel = require('../models/userModel');

const getAllUsers = (req, res) => {
    const sql = 'SELECT * FROM Utilisateur';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des utilisateurs :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
      //console.log(results);
        res.status(200).json(results);
    });
};

const getOneUser = (req, res) => {
    //Logique pour afficher un utilisateur
    const userId = req.params.id;
    const sql = 'SELECT * FROM Utilisateur WHERE Utilisateur_ID = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        const utilisateur = results[0];
        console.log(utilisateur.Prenoms);

        
        res.status(200).json(utilisateur.Nom, utilisateur.Prenoms); // On retourne le premier utilisateur trouvé
    });
};

const createUser =  (req, res) => {
  
   const { Nom, Prenoms, Classe, Email, Mot_de_passe, Photo} = req.body;  //, Role, Date_inscription, Photo
   const Role = "eleve";
   if (!Nom || !Prenoms || !Email || !Mot_de_passe || ! Classe ) { //|| !Role  || !Photo
     return res.status(400).json({ message: 'Tous les champs sont requis' });
   }
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
   if (!regexEmail.test(Email)) { //<=> si l'email n'et pas defini et repecte pas la forme du regex
    return res.status(400).json({ message: 'Email invalide' });
   }

   const regexNomPrenoms = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\-][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    if (!regexNomPrenoms.test(Nom) || !regexNomPrenoms.test(Prenoms)) {
      return res.status(400).json({ message: 'Nom ou prénoms invalides' });
    }

   // Vérifier si l'email existe déjà
   const checkSql = 'SELECT * FROM Utilisateur WHERE Email = ?';
   db.query(checkSql, [Email], async (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l’email :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Cet utilisateur exist déjà ' });
    }
    try {
      //Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(Mot_de_passe, 10); // 10 = nombre de "rounds"
      const Date_inscription = new Date(); // Date actuelle

      const insertSql = 'INSERT INTO Utilisateur (Nom, Prenoms, Email, Mot_de_passe, Role, Classe,  Date_inscription, Photo ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )'; //, Role, Date_inscription, Photo
      db.query(insertSql, [Nom, Prenoms, Email, hashedPassword, Role, Classe, Date_inscription, Photo], (err, result) => { //, Role, Date_inscription, Photo
        if (err) {
          console.error('Erreur lors de la création de l’utilisateur :', err);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        res.status(201).json({ message: 'Inscription reussie !!'});//,id: result.insertId,
        //res.statusMessage = "salut";
      });
    } catch (hashError) {
      console.error('Erreur lors du hachage du mot de passe :', hashError);
      res.status(500).json({ message: 'Erreur serveur (hachage)' });
    }
  });
};

const connetUser = (req, res) => {
  const { Email, Mot_de_passe  } = req.body;
  if (!Email || !Mot_de_passe ) {
    return res.status(400).json({ message: 'Tout les chmps  sont requis' });
  }
  const checkEmail = 'SELECT * FROM Utilisateur WHERE Email = ?';
  db.query(checkEmail, [Email], async (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification de l’email :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Verifiez votre mail svp !' });
    }
    const util = results[0];
    //console.log(results[0]);
    try {
      const isPasswordCorrect = await bcrypt.compare(Mot_de_passe, util.Mot_de_passe);// isPasswordCorrect renvoie true <=> les mots de passe correspondent
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'entre un mot de passe correct' });
      }
    
      // Création du token JWT
      const token = jwt.sign(
        { id: util.Utilisateur_ID, nom: util.Nom, role: util.Role, },JWT_SECRET,{ expiresIn: '1h' } //mon: util.Nom
      );
      // Sauvegarder le token dans la table Session
      const expiration = new Date(Date.now() + 60 * 60 * 1000); // 1h
      const Created_at = new Date(); // Date actuelle
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

      const insertSession = `INSERT INTO Session (Utilisateur_ID, Token_hash, Created_at, Expires_at) 
      VALUES (?, ?, ?, ?)`;
      db.query(insertSession,[util.Utilisateur_ID, hashedToken, Created_at, expiration], (err) => {
          if (err) {
            console.error('Erreur insertion session :', err);
            return res.status(500).json({ message: 'Erreur lors de la création de session' });
          }

          // Réponse envoyée au frontend 
            return res.status(200).json({
            message: 'Connexion réussie',token,
            util: {
            //id: util.Utilisateur_ID,
              nom: util.Nom,
              prenoms: util.Prenoms,
            }});
        });
        

    } catch (compareError) {
      console.error('Erreur comparaison mot de passe :', compareError);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  });
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id; // ID du user connecté
    const { Nom, Prenoms, Email, Mot_de_passe, Photo } = req.body;

    // Validation de l'email
    if (Email) {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!regexEmail.test(Email)) {
        return res.status(400).json({ message: 'Email invalide' });
      }
    }

    // Hacher le mot de passe seulement s'il est envoyé
    let hashedPassword = null;
    if (Mot_de_passe) {
      hashedPassword = await bcrypt.hash(Mot_de_passe, 10);
    }
    // Construire la requête dynamique
    let fields = [];
    let values = [];

    if (Nom) { 
      fields.push("Nom = ?"); values.push(Nom);//ne touche a nom si je t'est rien donné a mtre a jr.
     }
    if (Prenoms) {
       fields.push("Prenoms = ?"); values.push(Prenoms);
       }
    if (Email) {
       fields.push("Email = ?"); values.push(Email); 
      }
    if (hashedPassword) {
       fields.push("Mot_de_passe = ?"); values.push(hashedPassword); 
      }
    if (Photo) {
       fields.push("Photo = ?"); values.push(Photo); 
      }
    if (fields.length === 0) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
    }
    values.push(userId); // pour WHERE
    const sql = `UPDATE Utilisateur SET ${fields.join(", ")} WHERE Utilisateur_ID = ?`;
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Erreur SQL :', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      res.json({ message: 'Utilisateur mis à jour avec succès' });
    });

  } catch (error) {
    console.error('Erreur updateUser :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

const deleteUser =  (req, res) => {
    // Logique pour suprimer un utilisateur un utilisateur
  const id = req.params.id;
  sql = `DELETE FROM Utilisateur WHERE Utilisateur_ID = ?`;
  
  db.query(sql, [id], (err, result) =>{
    if(err){
      console.error('Erreur lors de la supression de l’utilisateur:', err);
    }
    res.status(200).json({message: 'Utilisateur suprimer avec succès'})
  } )  

}

module.exports = {
getAllUsers,
createUser,
connetUser,
updateUser,
deleteUser,
getOneUser,
};