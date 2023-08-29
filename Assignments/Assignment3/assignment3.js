//1. Create npm project and install express.js

const path = require('path');
const express = require('express');
const mainRouter = require('./routesA3/index');

const app = express();

//3. add some static(.js or .css) files to your project that should be required by at least one of your html files.

app.use(express.static(path.join(__dirname,'cssCode')));
app.use(mainRouter);


app.listen(1708);



