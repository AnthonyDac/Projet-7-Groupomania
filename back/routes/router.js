const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const userMiddleware = require("../middleware/users.js");
const multer = require('../middleware/multer-config.js');
const fs = require('fs');


//Poster un commentaire//
router.post('/commenter', multer, (req, res, next) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let fulldate = date+"/"+month+"/"+year;
  db.query(`INSERT INTO comments (comment_ID, post_ID, commented_by_ID, commentaire, date_commentaire) VALUES (null, ${db.escape(req.body.post_ID)}, ${db.escape(req.body.user_ID)}, ${db.escape(req.body.commentaire)}, ${db.escape(fulldate)});`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({msg: err});
      }
      return res.status(201).send({msg: 'Commentaire posté!'});
    }
  );
});
//Poster un message//
router.post('/posting', multer, (req, res, next) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let fulldate = date+"/"+month+"/"+year;
  var imageUrl;
  if(req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  if(imageUrl == undefined || imageUrl == null) {
    db.query(`INSERT INTO posts (post_ID, posted_by_ID, message, date_creation, imageURL) VALUES (null, ${db.escape(req.body.user_ID)}, ${db.escape(req.body.message)}, ${db.escape(fulldate)}, null);`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({msg: err});
      }
      return res.status(201).send({msg: 'Posté!'});
    }
  );
  } else {
    db.query(`INSERT INTO posts (post_ID, posted_by_ID, message, date_creation, imageURL) VALUES (null, ${db.escape(req.body.user_ID)}, ${db.escape(req.body.message)}, ${db.escape(fulldate)}, ${db.escape(imageUrl)});`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({msg: err});
      }
      return res.status(201).send({msg: 'Posté!'});
    }
  );
  }
});
//Récupérer un profil par ID//
router.get('/profil/:id', multer, async (req, res, next) => {
  db.query(`SELECT * FROM users WHERE user_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        res.send(result);
      }
    }
  );
});
//Vérifier si un user est admin par l'ID//
router.get('/userAdmin/:id', async (req, res, next) => {
  db.query(`SELECT isAdmin FROM users WHERE user_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        res.send(result);
      }
    }
  );
});
//Récupérer un post par ID//
router.get('/post/:id', multer, async (req, res, next) => {
  db.query(`SELECT * FROM posts WHERE post_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        res.send(result);
      }
    }
  );
});
//Modifier l'avatar d'un utilisateur par ID//
router.post('/update_profil/:id', multer, async (req, res, next) => {
  var imageUrl;
  if(req.file) {
    imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  }
  if(imageUrl == undefined || imageUrl == null) {
    return res.status(201).send({msg: 'Aucune image ajoutée'});
  } else {
    db.query(`UPDATE users SET avatarURL = ${db.escape(imageUrl)} WHERE user_ID = ${req.params.id};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({msg: err});
      }
      return res.status(201).send({msg: 'Avatar modifié!'});
    }
  );
  }
});
//Supprimer un utilisateur par ID//
router.put('/delete_user/:id', multer, async (req, res, next) => {
  db.query(`DELETE FROM users WHERE user_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        db.query(`DELETE FROM posts WHERE posted_by_ID = ${req.params.id};`,(err,result) => {
          if(err) throw err;
          if(!err) {
            return res.status(409).send({msg: 'Utilisateur supprimé'});
          }
        });
        db.query(`DELETE FROM comments WHERE commented_by_ID = ${req.params.id};`,(err,result) => {
          if(err) throw err;
          if(!err) {
            return res.status(409).send({msg: 'Commentaires supprimés'});
          }
        });
      }
    }
  );
});
//Supprimer un post par ID//
router.put('/delete_post/:id', multer, async (req, res, next) => {
  db.query(`DELETE FROM posts WHERE post_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        return res.status(409).send({msg: 'Post supprimé'});
      }
    }
  );
});
//Supprimer un commentaire par ID//
router.put('/delete_comment/:id', multer, async (req, res, next) => {
  db.query(`DELETE FROM comments WHERE comment_ID = ${req.params.id};`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        return res.status(409).send({msg: 'Commentaire supprimé'});
      }
    }
  );
});
//Récupérer tous les profils//
router.get('/allProfils', async (req, res, next) => {
  db.query(`SELECT * FROM users;`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        res.send(result);
      }
    }
  );
});
//S'inscrire//
router.post('/signup', userMiddleware.validateRegister, (req, res, next) => {
    db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({msg: 'Email déjà utilisé!'});
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({msg: err});
            } else {
              db.query(`INSERT INTO users (user_ID, firstname, lastname, email, password, avatarURL) VALUES (null, ${db.escape(req.body.firstname)}, ${db.escape(req.body.lastname)}, ${db.escape(req.body.email)}, ${db.escape(hash)}, 'http://127.0.0.1:3000/images/default_avatar.png');`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({msg: err});
                  }
                  return res.status(201).send({msg: 'Inscrit!'});
                }
              );
            }
          });
        }
      }
    );
  });
//Se connecter//
router.post('/login', (req, res, next) => {
  db.query(`SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({msg: err});
      }
      if (!result.length) {
        return res.status(401).send({msg: 'Email ou mot de passe incorrect!'});
      }
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(401).send({msg: 'Email ou mot de passe incorrect!'});
          }
          if (bResult) {
            const token = jwt.sign({
              email: result[0].email,
              userId: result[0].user_ID,
              isAdmin: result[0].isAdmin
              },'SECRETKEY', {expiresIn: '4h'});
              return res.status(200).send({msg: 'Logged in!',token,user: result[0]});
          }
          return res.status(401).send({
            msg: 'Email or password is incorrect!'
          });
        }
      );
    }
  );
});
//Récupérer tous les posts//
router.get('/allPosts', async (req, res, next) => {
  db.query(`SELECT b.post_ID, b.posted_by_ID, b.message, b.date_creation, b.imageURL, a.comment_ID, a.commented_by_ID, a.commentaire, a.date_commentaire, c.user_ID AS postUser_ID, c.firstname, c.lastname, c.avatarURL, d.user_ID, d.firstname AS userCommentFirstname, d.lastname AS userCommentLastname, d.avatarURL AS userCommentAvatarURL FROM posts b LEFT JOIN comments a ON b.post_ID = a.post_ID LEFT JOIN users c ON b.posted_by_ID = c.user_ID LEFT JOIN users d ON d.user_ID = a.commented_by_ID ORDER BY b.date_creation DESC;`,
  (err, result) => {
      if(err) throw err;
      if(!err) {
        
        var postID;
        var post;
        var comments =[];
        var finalResult = [];
        result.forEach((element,index) => {if(element.post_ID != postID || postID == null){
          if(postID != null) {
            post.comment = comments;
            finalResult.push(post);
            comments=[];
          }
          postID = element.post_ID;
          post = {
            post_ID : element.post_ID,
            message:element.message,
            date_creation : element.date_creation,
            imageURL: element.imageURL,
            firstname : element.firstname,
            lastname: element.lastname,
            avatarURL: element.avatarURL,
            user_ID: element.postUser_ID
          }
        }
        var comment = {
          commentaire_ID : element.comment_ID,
          commentaire : element.commentaire,
          firstname : element.userCommentFirstname,
          lastname : element.userCommentLastname,
          avatarURL : element.userCommentAvatarURL,
          date_commentaire : element.date_commentaire,
          post_sur_ID: element.post_ID
        }
        comments.push(comment)
        if(result.length == index+1) {
          
          post.comment = comments
          
          finalResult.push(post);
        }
      })
        res.send(finalResult);
      }
    }
  );
});

module.exports = router;