
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// set up port
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
// add routes
const router = require('./routes/router.js');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use('/', router);
// run server
app.listen(PORT, () => console.log(`NODEJS : Serveur démarré sur le port ${PORT}`));
app.use('/images', express.static(path.join(__dirname, 'images')));
