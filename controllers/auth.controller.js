const mongoose = require('mongoose');
const passport = require('passport');

const AuthController = {


  login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(res.json({
          error: "Error: something went wrong. Check your password/email."
        }));
      }

      if (!user) {
        return next(res.json({
          error: "Error: invalid user credentials."
        }));
      }

      req.logIn(user, err => {
        if (err) {
          return next(res.json({
            error: "Something went wrong."
          }))
        }

        return res.json({
          message: "Login successful.",
          status: 200,
        })
      })
    });
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
  }
};

module.exports = AuthController;