const router = require('express').Router();
const passport = require('passport');

const User = require('../controllers/user');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/api/user',
    failureRedirect:'/api/auth/failed'
  }));

router.route('/signup')
  .post(User.addNewUser);

router.route('/logout')
  .get((req, res) => {
    if (req.user) {
      req.logout();
      res.redirect('/api/failed');
    } else {
      res.send(401);
    }
  });

router.route('/failed')
  .get((req, res) => {
    res.send("Look like you done fucked up.");
  });

module.exports = router;