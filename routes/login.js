
import Admin from '../controller/Admin'
var express = require('express');
var router = express.Router();

/* login */
router.get('/', function(req, res, next) {
  res.render('login', {layout:null});
});

router.post('/loginCheck',Admin.login);

module.exports = router;
