const path = require('path');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const mongooose = require('mongoose');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://nehaakhatoon72:gGPKUGwHP1Y1nBO2@cluster0.5il7znj.mongodb.net/shop';
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');



const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    fs.mkdir('./images/',(err)=>{
      cb(null, './images/');
   });

  },
  // // filename: (req, file, cb) => {
  // //   cb(null, new Date().toISOString() + '-' + file.originalname); //.toISOString().replace(/:/g, '-')
  // }
  filename: function(req, file, cb){ 
    const now = new Date().toISOString(); 
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname); 
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({storage: fileStorage, fileFilter: fileFilter}).single('image')
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(
  session(
    {
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
  );
   app.use(csrfProtection);
   app.use(flash());

  app.use((req, res, next) => {
    if(!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
      if(!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      throw new Error(err);
    }); 
      
  });

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

mongooose
.connect(MONGODB_URI)
.then(result => {
  app.listen(3000)
})
.catch(err => {
  console.log(err);
});


