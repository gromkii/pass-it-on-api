const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  api = require('./routes/api.route'),
  userRoutes = require('./routes/users.route'),
  authRoutes = require('./routes/auth.route'),
  noteRoutes = require('./routes/notes.route'),
  port = process.env.PORT || 3000,
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt   = require('bcrypt'),
  User = require('./models/user.model'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pass_dev');

// --- Middleware --- //
app.use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(cors());

// --- Passport --- //
app.use(cookieParser());
app.use(session({ secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({username: username}, (err, user) => {
    if (user) {
      user = user.toJSON();
    }
    if (user && bcrypt.compareSync(password, user.password)){
      return done(null, user);
    }

    return done(null, false);
  });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  //TODO: Remove this header, no bueno.
  res.header("Access-Control-Allow-Origin", "http://192.168.7.20");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


// --- Routes --- //
app.use('/api', api);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log('Server is listening.');
});

module.exports = app;