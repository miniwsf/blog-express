
import Article from '../controller/Article'
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('blog', {layout:null});
});
router.get('/index/blog', Article.getBlog);
router.get('/index/blog', Article.getBlog);
router.get('/index/blogDetail', Article.getBlogDetail);

module.exports = router;
