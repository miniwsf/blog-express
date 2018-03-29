
import Article from "../controller/Article";

let express = require("express");
let router = express.Router();

router.get("/",  function(req, res) {
    res.render("home/home", {layout:"index"});
});
router.get("/demos", function(req, res) {
    res.render("home/demo", {layout:"index"});
});
router.get("/blog", function(req, res, next) {
    res.render("home/blog", {layout:"index"});
})
router.post("/blog", Article.getBlogMore);
router.get("/blog/:articleId", Article.getBlogDetail);
router.get("/about", function(req, res) {
    res.render("home/aboutMe", {layout:"index"});
});
router.put("/blog/:articleId", Article.praiseBlog);

module.exports = router;