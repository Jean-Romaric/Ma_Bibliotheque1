const mysql = require('mysql2'); 
const db = require('../config/db');

const getAllBooks = (req, res) => {
    // Logique pour récupérer tous les Livres
    const sql = 'SELECT * FROM Livre'
    db.query(sql,(err, results)=> {
        if(err){
            console.error('Erreur lors de la recupération des livres',err)
            console.log(err);
            return res.status(500).json({error:'Erreur serveur'});
        }
        res.status(200).json(results);
    });
};

const getOneBook = (req, res) => {
     // Logique pour récupérer un Livre
     const Livre_ID = req.params.id;
        const sql = 'SELECT * FROM Livre WHERE Livre_ID = ?'
        db.query(sql,[Livre_ID],(err,results)=> {
            
            if(err) {
                console.error('Erreur lors de la récupération du livre',err);
            }
            
            if ( results.length === 0){
                 return res.status(404).json({ message:'Livre non trouvé' });
            }
            res.status(200).json(results[0]);//on peut ajouter un message a chaque res
        })
}

const createBook = (req, res) => {
  const { Titre, Auteur, Annee_publication, Genre, Image_livre, Quantite } = req.body;

  if (!Titre || !Auteur || !Annee_publication || !Genre || !Image_livre || !Quantite ) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const checkSql = `
      SELECT * FROM Livre
      WHERE Titre = ? AND Auteur = ? AND Annee_publication = ? AND Genre = ? 
  `;// j'enveler image perceque l'image

  db.query(checkSql, [Titre, Auteur, Annee_publication, Genre], (err, results) => { // j'enveler image perceque l'image 
                                                                                    // l'image peut etre diferent pas sont extention
    if (err) {
      console.error('Erreur lors de la vérification du livre :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
      console.log(results);
    if (results.length > 0) {

       return res.status(500).json({ message: 'livre deja ajouté' });//

    } else {
      const insertSql = `
        INSERT INTO Livre (Titre, Auteur, Annee_publication, Genre, Image_livre, Quantite)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      db.query(insertSql, [Titre, Auteur, Annee_publication, Genre, Image_livre, Quantite ], (insertErr) => {
        if (insertErr) {
          console.error('Erreur lors de l\'ajout du livre :', insertErr);
          return res.status(500).json({ message: 'Erreur serveur' });
        }
        return res.status(201).json({ message: 'Livre ajouté avec succès' });
      });
    }
  });
};

const updateBook = (req, res) => {
            //Récupérer les données
  const livreId = req.params.id; // ID du livre depuis l'URL
  const { Titre, Auteur, Annee_publication, Genre, Image_livre, Quantite } = req.body;

    //on vas verifier d"abord, si le livre est unique 
    //Pour ne pas qu'il modifie le Titre, la dt de publication d'un livre pour mettre a celui 
    //d"un autre livre. //ex id:1 Titre: Rebelle livre a modifier => petit prince id:2 Titre: Rebelle 
    //Resultat on id:1 Titre: Rebelle, id:2 Titre: Rebelle.
   let fields = [];
   let values = [];

    if(Titre){
        fields.push("Titre = ?"); values.push(Titre);
    } 
    if(Auteur){
      fields.push("Auteur = ?"); values.push(Auteur);
    }
    if(Annee_publication){
      fields.push("Annee_publication = ?"); values.push(Annee_publication); 
    }
    if(Genre){
      fields.push("Genre = ?"); values.push(Genre);
    }
    if(Image_livre){
      fields.push("Image_livre = ?"); values.push(Image_livre);
    }
    if(Quantite){
      fields.push("Quantite = ?"); values.push(Quantite);
    }
    values.push(livreId)

  const  updateBookSql = `UPDATE Livre SET ${fields.join(", ")} WHERE Livre_ID = ?`;
    db.query(updateBookSql,values,(err, result)=>{
      if(err){
        console.error('erreur SQL :', err);
        res.status(500).json({ messge: 'Erreur serveur'});
      }
      res.json({ message: 'Livre modifier avec succès'});
    });
};

const deleteBook = (req, res) => {
  const livreId = req.params.id; // Récupérer l’ID du livre

            //Vérifier si le livre existe

       const checkSql = 'SELECT * FROM Livre WHERE Livre_ID = ?';
  db.query(checkSql, [livreId], (err, results) => {
    if (err) {
      console.error('Erreur lors de la vérification du livre :', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

       // Supprimer le livre

           const deleteSql = 'DELETE FROM Livre WHERE Livre_ID = ?';
    db.query(deleteSql, [livreId], (deleteErr) => {
      if (deleteErr) {
        console.error('Erreur lors de la suppression du livre :', deleteErr);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      return res.status(200).json({ message: 'Livre supprimé avec succès' });
    });
  });
};

module.exports = { 
  getAllBooks, 
  getOneBook, 
  createBook, 
  updateBook, 
  deleteBook };



