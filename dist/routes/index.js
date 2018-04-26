"use strict";
var _Article = require("../controller/Article");var _Article2 = _interopRequireDefault(_Article);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    res.render("home/home", { layout: "index" });
});
router.get("/demos", function (req, res) {
    res.render("home/demo", { layout: "index" });
});
router.get("/blog", function (req, res, next) {
    res.render("home/blog", { layout: "index" });
});
router.post("/blog", _Article2.default.getBlogMore);
router.get("/blog/:articleId", _Article2.default.getBlogDetail);
router.get("/about", function (req, res) {
    res.render("home/aboutMe", { layout: "index" });
});
router.put("/blog/:articleId", _Article2.default.praiseBlog);

module.exports = router;