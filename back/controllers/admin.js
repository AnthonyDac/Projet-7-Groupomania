const db = require('../lib/db.js');
const fs = require('fs');

//Promouvoir en admin un utilisateur par ID//
exports.setAdmin = (req, res, next) => {
    db.query(`UPDATE users SET isAdmin = 1 WHERE user_ID = '${req.params.id}';`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send({msg: 'Utilisateur désormais admin!'});
        }
      }
    );
  };
  //Retirer les droits admin à un utilisateur par ID//
 exports.removeAdmin = (req, res, next) => {
    db.query(`UPDATE users SET isAdmin = 0 WHERE user_ID = '${req.params.id}';`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send({msg: 'Utilisateur désormais un moldu!'});
        }
      }
    );
  };