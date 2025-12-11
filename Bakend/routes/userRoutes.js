const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users',userController.getAllUsers);
router.get('/user/:id',userController.getOneUser);




router.post('/register',userController.createUser);


router.post('/login',userController.connetUser);





router.put('/user/:id',userController.updateUser);

router.delete('/user/:id',userController.deleteUser);

module.exports = router; 
