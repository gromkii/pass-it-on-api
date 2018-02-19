const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  api = require('./routes/api'),
  userRoutes = require('./routes/users'),
  authRoutes = require('./routes/auth'),
  port = process.env.PORT || 3000,
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt   = require('bcrypt'),
  User = require('./model/user'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pass_dev');


app.use(express.static('public'))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended:false}))
  .use(methodOverride('_method'))
  .use(cors());

// --- Passport Strat --- //
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

app.use('/api', api);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log('Server is listening.');
});

module.exports = app;