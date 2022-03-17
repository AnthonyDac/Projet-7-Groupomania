const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config.js');
const adminCtrl = require('../controllers/admin');

//Promouvoir en admin un utilisateur par ID//
router.put('/userNowAdmin/:id', multer, adminCtrl.setAdmin);
//Retirer les droits admin à un utilisateur par ID//
router.put('/userNotAdmin/:id', multer, adminCtrl.removeAdmin);

module.exports = router;