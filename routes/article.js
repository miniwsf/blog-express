
import Article from '../controller/Article'
import CheckToken from '../middlewares/checkToken'

var express = require('express');
var router = express.Router();

router.get('/',CheckToken,Article.getArticle);
router.post('/deleteArticle',CheckToken,Article.deleteArticle);
router.get('/articleEdit',CheckToken,Article.updateArticle);
router.post('/articleAddOk',CheckToken,Article.updateAndSave);
router.get('/articleAdd',CheckToken,Article.getArticleDataById);

module.exports = router;
