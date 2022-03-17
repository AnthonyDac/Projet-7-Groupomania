const jwt = require('jsonwebtoken');

module.exports = {
    validateRegister: (req, res, next) => {
        if(!req.body.email || req.body.email.length < 3) {
            return res.status(400).send({
                message: 'Adresse mail invalide',
            });
        }
        if(!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: 'Mot de passe trop court',
            });
        }
        next();
    },
    isLoggedIn: (req, res, next) => {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(
            token,
            'SECRETKEY'
          );
          req.userData = decoded;
          next();
        } catch (err) {
          return res.status(401).send({
            msg: 'Your session is not valid!'
          });
        }
      }
}