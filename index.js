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
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('650bdf967ffd265904b492e4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
}); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(errorController.get404);

mongooose
.connect('mongodb+srv://nehaakhatoon72:gGPKUGwHP1Y1nBO2@cluster0.5il7znj.mongodb.net/shop?retryWrites=true&w=majority&appName=AtlasApp')
.then(result => {
  User.findOne().then(user => {
    if(!user) {
      const user = new User({
        name: 'Rob',
        email: 'rob124@gmail.com',
        cart: {
          item: []
        }
      });
      user.save();
    }
  });
  app.listen(3000)
})
.catch(err => {
  console.log(err);
})


