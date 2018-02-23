const router = require('express').Router();

const User = require('../controllers/user.controller');
const Auth = require('../controllers/auth.controller');

router.route('/login')
  .post(Auth.login);

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