const User = require('../model/user');
const UserController = {
  addNewUser(req, res) {
    console.log(req.body);


    let newUser = User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      created_at: new Date(),
      updated_at: new Date()
    });

    newUser.save();

    User.findOne({username: newUser.username}, (err, user) => {
      res.json({username: user.username});
    });

  }
}


module.exports = UserController;