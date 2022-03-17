const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config.js');
const postCtrl = require('../controllers/posts');

//Poster un message//
router.post('/posting', multer, postCtrl.poster);
//Récupérer tous les posts//
router.get('/allPosts', multer, postCtrl.getAllPosts);
//Récupérer un post par ID//
router.get('/post/:id', multer, postCtrl.getPostById);
//Supprimer un post par ID//
router.put('/delete_post/:id', multer, postCtrl.deletePostById);

module.exports = router;