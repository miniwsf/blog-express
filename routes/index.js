var express = require('express');
var router = express.Router();

//import Admin from ../controller/Admin;
var Admin=require("../controller/Admin");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/', Admin.getInfo);


module.exports = router;
