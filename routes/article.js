
var express = require('express');
var router = express.Router();

/* login */
router.get('/', function(req, res, next) {
  res.render('article');
});

module.exports = router;
