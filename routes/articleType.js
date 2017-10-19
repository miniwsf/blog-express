
import ArticleType from '../controller/ArticleType'
import CheckToken from '../middlewares/checkToken'
var express = require('express');
var router = express.Router();

router.get('/',CheckToken,ArticleType.getArticleType);
router.get('/deleteArticleType',CheckToken,ArticleType.deleteArticleType);
router.get('/articleTypeEdit',CheckToken,ArticleType.updateArticleType);
router.post('/articleTypeAddOk',CheckToken,ArticleType.addArticleType);
router.get('/articleTypeAdd',function(req, res, next) {
  res.render('articleAdd');
});

module.exports = router;
