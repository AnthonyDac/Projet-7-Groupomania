const db = require('../lib/db.js');
const fs = require('fs');

//Poster un message//
exports.poster = (req, res, next) => {
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
  };

  //Récupérer tous les posts//
exports.getAllPosts = (req, res, next) => {
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
  };

  //Récupérer un post par ID//
exports.getPostById = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE post_ID = ${req.params.id};`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          res.send(result);
        }
      }
    );
  };
//Supprimer un post par ID//
exports.deletePostById = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE post_ID = ${req.params.id};`,
    (err, result) => {
        if(err) throw err;
        if(!err) {
          db.query(`DELETE FROM comments WHERE post_ID = ${req.params.id};`,
          (err, result) => {
              if(err) throw err;
              if(!err) {
                return res.status(409).send({msg: 'Post supprimé'});
              }
            }
          );
        }
      }
    );
  };