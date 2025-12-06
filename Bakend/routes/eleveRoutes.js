const express = require('express');
const router = express.Router();
const eleveController = require('../controllers/eleveController');

router.get('/eleves',eleveController.getAllEleves);
router.get('/eleve',eleveController.getOneEleve);
router.post('/eleve',eleveController.createEleve); 
router.put('/eleve',eleveController.updateEleve);
router.delete('/eleve/',eleveController.deleteEleve);

module.exports = router;
