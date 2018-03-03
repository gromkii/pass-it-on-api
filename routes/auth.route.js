const router = require('express').Router();
const passport = require('passport');

const AuthController = require('../controllers/auth.controller');

router.route('/login')
  .post(passport.authenticate('local', {
    successRedirect:'/api/auth/success',
    failureRedirect:'/api/auth/failed'
  }));

router.route('/logout')
  .get(AuthController.logout);

router.route('/success')
  .get(AuthController.loginSuccessful);

router.route('/failed')
  .get(AuthController.loginFailed);

module.exports = router;