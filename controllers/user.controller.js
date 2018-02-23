const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const UserController = {

  /**
   * Adds new user with supplied info. Username, Email, Password.
   * @param req
   * @param res
   */
  addNewUser(req, res) {
    User.findOne({username: req.body.username}, (err, user) => {
      if (!user) {
        let newUser = User({
          username: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
          created_at: new Date(),
          updated_at: new Date()
        });


        newUser.save();

        // TODO: Break responses into a standardized data structure.
        res.json({
          message: "New account has been created."
        });
      } else {
        res.json({
          error: "User with that email/login already exists.",
          message: ""
        });
      }
    });
  },

  /**
   * Lookup user based on /users/:user_id, returns specified user if found.
   * @param req
   * @param res
   */
  findUserById(req, res) {
    User.findOne({id: req.params.user_id}, (err, user) => {
      if (!user) {
        res.json({
          error: "No user found specified id.",
          message: ""
        })
      } else {
        res.json({
          user: user.toJSON(),
          message: "User found"
        });
      }
    });
  }
};


module.exports = UserController;