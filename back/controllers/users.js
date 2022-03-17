const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../lib/db.js');
const fs = require('fs');
const uuid = require('uuid');

//S'inscrire//
exports.signup = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(req.body.email)});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({msg: 'Email déjà utilisé!'});
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({msg: err});
            } else {
              db.query(`INSERT INTO users (user_ID, firstname, lastname, email, password, avatarURL) VALUES ('${uuid.v4()}', ${db.escape(req.body.firstname)}, ${db.escape(req.body.lastname)}, ${db.escape(req.body.email)}, ${db.escape(hash)}, 'http://127.0.0.1:3000/images/default_avatar.png');`,
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
};

//Se connecter//
exports.login = (req, res, next) => {
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
};

//Récupérer un profil par ID//
exports.profilById = (req, res, next) => {
    db.query(`SELECT * FROM users WHERE user_ID = '${req.params.id}';`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send(result);
        }
      }
    );
};
//Vérifier si un user est admin par l'ID//
exports.isAdmin = (req, res, next) => {
    db.query(`SELECT isAdmin FROM users WHERE user_ID = '${req.params.id}';`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send(result);
        }
      }
    );
};
//Récupérer tous les profils//
exports.getAllUsers = (req, res, next) => {
    db.query(`SELECT * FROM users;`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send(result);
        }
      }
    );
  };
//Modifier l'avatar d'un utilisateur par ID//
exports.avatarModifier = (req, res, next) => {
    var imageUrl;
    if(req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    if(imageUrl == undefined || imageUrl == null) {
      return res.status(201).send({msg: 'Aucune image ajoutée'});
    } else {
      db.query(`UPDATE users SET avatarURL = ${db.escape(imageUrl)} WHERE user_ID = '${req.params.id}';`,
      (err, result) => {
        if (err) {
          throw err;
          return res.status(400).send({msg: err});
        }
        return res.status(201).send({msg: 'Avatar modifié!'});
      }
    );
    }
};
//Supprimer un utilisateur par ID//
exports.deleteUser = (req, res, next) => {
    db.query(`DELETE FROM users WHERE user_ID = '${req.params.id}';`,(err) => {
      if(err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
      if(!err) {
        db.query(`DELETE FROM posts WHERE posted_by_ID = '${req.params.id}';`,(err) => {
          if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
          }
          if(!err) {
            db.query(`DELETE FROM comments WHERE commented_by_ID = '${req.params.id}';`,(err) => {
              if (err) {
                console.log(err);
                res.sendStatus(500);
                return;
              }
              if(!err) {
                return res.status(409).send({msg: 'Utilisateur + posts + commentaires supprimés'});
              }
            });
          }
        });
      }
    });
  };