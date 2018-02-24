const router = require('express').Router();
const passport = require('passport');

const User = require('../controllers/user.controller');
const Auth = require('../controllers/auth.controller');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/api/auth/success',
    failureRedirect:'/api/auth/failed'
  }));

  // TODO: Should this method be moved over to Auth controller?
router.route('/signup')
  .post(User.addNewUser);

router.route('/logout')
  .get(Auth.logout);

router.route('/success')
  .get(Auth.loginSuccessful);

router.route('/failed')
  .get(Auth.loginFailed);

module.exports = router;