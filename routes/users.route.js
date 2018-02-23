const router = require('express').Router();
const UserController = require('../controllers/user.controller');


router.route('/')
  .get((req, res) => {
    res.json({message:"/users"})
  })
  .post(UserController.addNewUser);

router.route('/:user_id')
  .get(UserController.findUserById);

module.exports = router;