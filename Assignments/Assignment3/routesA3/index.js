//2. create an express.js app which serves two html files for '/' and '/users'

const path = require('path');
const express = require('express');

const routes = express.Router();

routes.get('/', (req,res, next) => {
    res.sendFile(path.join(__dirname,'..','htmlCode','slash.html'));
});

routes.get('/user', (req, res ,next) => {
    res.sendFile(path.join(__dirname,'..','htmlCode','user.html'));
});

module.exports = routes;