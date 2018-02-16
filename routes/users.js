const router = require('express').Router();

router.route('/')
  .get((req, res) => {
    res.json({message:"/users"})
  });

module.exports = router;