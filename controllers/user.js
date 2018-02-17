const User = require('../model/user');
const bcrypt = require('bcrypt');
const UserController = {


  addNewUser(req, res) {
    // TODO: Hash user password, add more fields as needed.
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

        res.send("New user created!");
      } else {
        res.send("User already exists with that username.");
      }
    });
  },

  findUserById(req, res) {
    User.findOne({id: req.params.user_id}, (err, user) => {
      if (!user) {
        res.send("No user with that ID was found.");
      } else {
        res.json(user.toJSON());
      }
    });
  }
};


module.exports = UserController;