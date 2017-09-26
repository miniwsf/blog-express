
import Article from '../controller/Article'
import ArticleType from '../controller/ArticleType'
var express = require('express');
var router = express.Router();

router.get('/', Article.getArticle);
router.post('/deleteArticle',Article.deleteArticle);
router.get('/articleEdit',Article.updateArticle);
router.post('/articleAddOk',Article.addArticle);
router.get('/articleAdd',ArticleType.getArticleTypeOther)

module.exports = router;
