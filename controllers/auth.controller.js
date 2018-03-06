const passport = require('passport');

const AuthController = {

  /**
   * Login with 'local' strategy.
   */
  login() {
    passport.authenticate('local', {
      successRedirect:'/api/auth/success',
      failureRedirect:'/api/auth/failed'
    })
  },

  /**
   * Logs out current user session.
   * @param req
   * @param res
   */
  logout(req, res) {
    if (req.user) {
      req.logout();
      res.redirect('/api/failed');
    } else {
      res.send(401);
    }
  },

  /**
   * Return error message when passport redirects authentication failure.
   * @param req
   * @param res
   */
  loginFailed(req, res) {
    res.json({
      error: "Failed to authenticate.",
      message: "",
    });
  },

  /**
   * Returns login message when redirected from successful login.
   * @param req
   * @param res
   */
  loginSuccessful(req, res) {
    res.json({
      message: "You have successfully logged in."
    });
  }
};

module.exports = AuthController;