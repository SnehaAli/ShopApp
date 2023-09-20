const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongooose = require('mongoose');
const User = require('./models/user');
 

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('65092f1b3a18d4318f37ec9a')
    .then(user => {
      req.user = new User(user.username,  user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongooose
.connect('mongodb+srv://nehaakhatoon72:gGPKUGwHP1Y1nBO2@cluster0.5il7znj.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasApp')
.then(result => {
  app.listen(3000)
})
.catch(err => {
  console.log(err);
})


