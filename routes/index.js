
import Article from '../controller/Article'
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {layout:null});
});

router.get('/index/blog', Article.getBlog);

module.exports = router;
