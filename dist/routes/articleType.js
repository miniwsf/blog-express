"use strict";
var _ArticleType = require("../controller/ArticleType");var _ArticleType2 = _interopRequireDefault(_ArticleType);
var _checkToken = require("../middlewares/checkToken");var _checkToken2 = _interopRequireDefault(_checkToken);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", _checkToken2.default, function (req, res) {
    res.render("articleType/articleType");
});
router.get("/typeData", _ArticleType2.default.getArticleTypeMore);
router.delete("/", _checkToken2.default, _ArticleType2.default.deleteArticleType);
router.post("/", _checkToken2.default, _ArticleType2.default.addArticleType);
router.get("/articleTypeAdd", function (req, res) {
    res.render("articleAdd");
});

module.exports = router;