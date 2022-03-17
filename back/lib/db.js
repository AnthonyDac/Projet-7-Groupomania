const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'groupomania',
    password: 'root',
});
connection.connect(function(err, result) {
    if (err) throw err;
    console.log('MYSQL '+ JSON.stringify(result.serverVersion) + ': Connecté à la base de données');
  });

module.exports = connection;