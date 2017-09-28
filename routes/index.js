
import Article from '../controller/Article'
var express = require('express');
var router = express.Router();

router.get('/', Article.getHome);
router.get('/blog', Article.getBlog);
router.get('/blogDetail', Article.getBlogDetail);
router.get('/abountMe', function(req, res, next) {
    res.render('abountMe', {layout:"index"});
});
router.get('/blogDetail/praiseBlog', Article.praiseBlog);

module.exports = router;