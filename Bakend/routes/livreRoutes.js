// routes/livreRoutes.js
const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const verifierAdmin = require('../middlewares/verifierAdmin');
const verifierToken = require('../middlewares/verifierToken');


// Définir la route qui utilise le contrôleur ,
router.get('/livres', livreController.getAllBooks);
router.get('/livre/:id',livreController.getOneBook); //verifierToken je ne met ps parceque n'importe qui peut voir un livre

router.post('/livre',verifierToken, verifierAdmin, livreController.createBook);// verifierToken => l'utilisateur doit etre connecter pour voir cette route
router.put('/livre/:id',verifierToken,livreController.updateBook);

router.delete('/livre/:id',verifierToken,verifierAdmin,livreController.deleteBook)

module.exports = router;
