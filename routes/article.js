
import Article from '../controller/Article'
import ArticleType from '../controller/ArticleType'
var express = require('express');
var router = express.Router();

router.get('/', Article.getArticle);
router.post('/deleteArticle',Article.deleteArticle);
router.get('/articleEdit',Article.updateArticle);
router.post('/articleAddOk',Article.updateAndSave);
router.get('/articleAdd',Article.getArticleDataById);

module.exports = router;
