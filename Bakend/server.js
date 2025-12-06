//(4)
const express = require('express'); //importes le module Express.
//Résultat : maintenant, express contient toutes les fonctionnalités offertes par le framework Express
const db = require('./config/db');
const app = express();  //express() est une fonction du module Express.
                        //Mais se fichier c'est objet app 
const cors = require('cors');
const path = require("path");

const verifierAdmin = require('./middlewares/verifierAdmin');
const verifierToken = require('./middlewares/verifierToken')

const userRoutes = require('./routes/userRoutes');
const livreRoutes = require('./routes/livreRoutes');
const empruntRoutes = require('./routes/empruntRoutes');
const eleveRoutes = require('./routes/eleveRoutes')

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(livreRoutes);
app.use(empruntRoutes);
app.use(eleveRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));//backend/images/lvre.jpeg
//http://localhost:8000/images/livre1.jpg

//app.use(express.static(path.join(__dirname, "public/images")));
//http://localhost:8000/livre1.jpg



app.get('/dashboard',verifierToken ,verifierAdmin, (req, res) => {
  res.json({ message: 'Bienvenue Admin !', utilisateur: req.utilisateur });
});
//Je veux demander sur les diff pages ?

app.get('/profil', verifierToken, (req, res) => {
  res.json({ message: 'Page profil', });//utilisateur: req.utilisateur -/utilisateur(..)
});

app.get('/', (req, res) => { //req et res sont des objets qui ont des methodes
  res.send('Home Page 😎 ',{utilisateur: req.utilisateur });
}); 

//app.use(getAllUsers);
app.listen(port, () => {
  console.log(`Le server ecoute http://localhost:${port}`)
})
