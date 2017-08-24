
var express = require('express');
var router = express.Router();

/* get data */
router.get('/', function(req, res, next) {
  res.render('article');
});


module.exports = router;
