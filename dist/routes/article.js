"use strict";
var _Article = require("../controller/Article");var _Article2 = _interopRequireDefault(_Article);
var _checkToken = require("../middlewares/checkToken");var _checkToken2 = _interopRequireDefault(_checkToken);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", _checkToken2.default, function (req, res) {
    res.render("article/article");
});
router.delete("/", _checkToken2.default, _Article2.default.deleteArticle);
router.put("/", _checkToken2.default, _Article2.default.updateArticle);
router.post("/", _checkToken2.default, _Article2.default.updateAndSave);
router.get("/articleAdd", _checkToken2.default, _Article2.default.getArticleDataById);

module.exports = router;