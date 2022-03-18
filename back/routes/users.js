const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/users.js");
const multer = require('../middleware/multer-config.js');
const userCtrl = require('../controllers/users.js');

//Créer un compte
router.post('/signup', multer, userCtrl.signup);
//Se connecter
router.post('/login', multer, userCtrl.login);
//Récupérer un profil par ID//
router.get('/profil/:id', multer, userCtrl.profilById);
//Vérifier si un user est admin par l'ID//
router.get('/userAdmin/:id', multer, userCtrl.isAdmin);
//Récupérer tous les profils//
router.get('/allProfils', multer, userCtrl.getAllUsers);
//Modifier l'avatar d'un utilisateur par ID//
router.post('/update_profil/:id', multer, userCtrl.avatarModifier);
//Supprimer un utilisateur par ID//
router.delete('/delete_user/:id', multer, userCtrl.deleteUser);

module.exports = router;
