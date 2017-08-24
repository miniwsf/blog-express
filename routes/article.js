
import Article from '../controller/Article'
var express = require('express');
var router = express.Router();

router.get('/', Article.getArticle);
router.get('/deleteArticle',Article.deleteArticle);
router.get('/articleEdit',Article.editArticle);
router.get('/articleAddOk',Article.addArticle);
router.get('/articleAdd',function(req, res, next) {
  res.render('articleAdd');
})

module.exports = router;
