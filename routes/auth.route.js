const router = require('express').Router();
const passport = require('passport');

const User = require('../controllers/user.controller');
const Auth = require('../controllers/auth.controller');

router.route('/login')
  .post(Auth.login);

  // TODO: Check for edge cases in this code ^^
  //   passport.authenticate('local', {
  //   successRedirect:'/api/users',
  //   failureRedirect:'/api/auth/failed'
  // })

router.route('/signup')
  .post(User.addNewUser);

router.route('/logout')
  .get(Auth.logout);

router.route('/failed')
  .get(Auth.loginFailed);

module.exports = router;