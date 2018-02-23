const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.json({message: "base_api"});
  });


module.exports = router;