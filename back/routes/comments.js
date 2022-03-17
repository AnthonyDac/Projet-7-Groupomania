const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config.js');
const commentCtrl = require('../controllers/comments');

//Poster un commentaire//
router.post('/commenter', multer, commentCtrl.commenter);
//Supprimer un commentaire par ID//
router.put('/delete_comment/:id', multer, commentCtrl.deleteCommentById);

module.exports = router;