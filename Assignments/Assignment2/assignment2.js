const express = require('express');
const app = express();


// app.use((req,res,next) => {
//     console.log('First Middleware');
//     next();
// });
// app.use((req,res,next) => {
//     console.log('Second Middleware');
// });

app.use('/users', (req, res, next) => {
    console.log('/users middleware');
    res.send('<p>This is /users middleware response');

});


app.use('/', (req, res, next) => {
    console.log('/ middleware');
    res.send('<p>This is / middleware response');

});


app.listen(1008);