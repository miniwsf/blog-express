
import ArticleType from '../controller/ArticleType'
var express = require('express');
var router = express.Router();

router.get('/', ArticleType.getArticleType);
router.get('/deleteArticleType',ArticleType.deleteArticleType);
router.get('/articleTypeEdit',ArticleType.updateArticleType);
router.post('/articleTypeAddOk',ArticleType.addArticleType);
router.get('/articleTypeAdd',function(req, res, next) {
  res.render('articleAdd');
})

module.exports = router;
