const db = require('../lib/db.js');
const fs = require('fs');

//Poster un commentaire//
exports.commenter = (req, res, next) => {
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
};
//Supprimer un commentaire par ID//
exports.deleteCommentById = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comment_ID = ${req.params.id};`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          return res.status(409).send({msg: 'Commentaire supprimé'});
        }
      }
    );
  };