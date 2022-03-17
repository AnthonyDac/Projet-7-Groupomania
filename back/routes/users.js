const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/users.js");
const multer = require('../middleware/multer-config.js');
const userCtrl = require('../controllers/users.js');

//Créer un compte
router.post('/signup', userMiddleware.validateRegister, userCtrl.signup);
//Se connecter
router.post('/login', userMiddleware.validateRegister, userCtrl.login);
//Récupérer un profil par ID//
router.get('/profil/:id', userCtrl.profilById);
//Vérifier si un user est admin par l'ID//
router.get('/userAdmin/:id', userCtrl.isAdmin);
//Récupérer tous les profils//
router.get('/allProfils', userCtrl.getAllUsers);
//Modifier l'avatar d'un utilisateur par ID//
router.post('/update_profil/:id', multer, userCtrl.avatarModifier);
//Supprimer un utilisateur par ID//
router.delete('/delete_user/:id', multer, userCtrl.deleteUser);

module.exports = router;