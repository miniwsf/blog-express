
var express = require('express');
var router = express.Router();
import Admin from '../controller/admin'

/* login */
router.get('/', function(req, res, next) {
  res.render('login', {layout:null});
});

router.post('/',Admin.login);

module.exports = router;
